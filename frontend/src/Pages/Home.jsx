/** @format */

// src/pages/Home.js
import { Container, Typography } from "@mui/material";
import BlogList from "../components/BlogList/blogList";

const Home = () => {
  const posts = [
    {
      id: 1,
      title: "First Post",
      content:
        "This is the content of the first post. It can contain a lot of information about the topic.",
      createdAt: "2023-01-01",
      image:
        "https://www.shutterstock.com/image-photo/high-power-electricity-poles-connected-260nw-1276903264.jpg", // Path to the local image file
    },
    {
      id: 2,
      title: "Second Post",
      content:
        "Here's the content for the second post. You can include text, images, and more.",
      createdAt: "2023-02-01",
      image:
        "https://www.shutterstock.com/image-photo/icons-wifi-internet-communication-travel-260nw-578845732.jpg", // Path to the local image file
    },
    // Add more placeholder posts with content
  ];

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Latest Blog Posts
      </Typography>
      <BlogList posts={posts} />
    </Container>
  );
};

export default Home;
