/** @format */

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState([]);
  let { postId } = useParams();
  console.log(postId);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPost();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts
  return (
    <Container>
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
          <Typography color='textSecondary'>{post.content}</Typography>

          <Typography
            color='textSecondary'
            sx={{ fontSize: 10, marginTop: 1, textAlign: "right" }}
          >
            {`${post.createdAt}`}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Post;
