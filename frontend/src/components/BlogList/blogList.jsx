/** @format */

import { useEffect, useState } from "react";
import { List, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    fontSize: 12,
    marginTop: 1,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: 2, // Number of lines to show
  },
}));

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts
  return (
    <List>
      {posts.map((post) => (
        <Card
          key={post._id} // Assuming _id is the unique identifier of a post
          sx={{ marginBottom: 2, borderLeft: "5px solid #4CAF50" }}
        >
          <CardContent>
            <Typography variant='h6'>{post.title}</Typography>
            {post.photo && (
              <img
                src={post.photo} // Set the src attribute with the base64 string
                alt={post.title}
                style={{ maxWidth: "100%", height: "auto", marginTop: "8px" }}
              />
            )}
            <Typography className={classes.content} color='textSecondary'>
              {post.content.length > 100 ? (
                <>
                  {`${post.content.substring(0, 100)}... `}
                  <Link to={`/post/${post.id}`}>See more</Link>
                </>
              ) : (
                post.content
              )}
            </Typography>
            <Typography variant='body1' paragraph>
              {/* Remaining text */}
            </Typography>
            <Typography
              color='textSecondary'
              sx={{ fontSize: 10, marginTop: 1, textAlign: "right" }}
            >
              {`${post.createdAt}`}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </List>
  );
};

export default BlogList;
