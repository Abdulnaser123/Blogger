/** @format */

// src/pages/Home.js
import { Container, Typography } from "@mui/material";
import BlogList from "../components/BlogList/blogList";

const Home = () => {
  return (
    <Container>
      <Typography variant='h4'>Latest Blog Posts</Typography>
      <BlogList />
    </Container>
  );
};

export default Home;
