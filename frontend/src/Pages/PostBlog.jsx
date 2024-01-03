/** @format */

import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

const PostBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const handlePost = async () => {
    if (!title || !content) {
      console.error("Title and content are required");
      return;
    }
    try {
      let photoBase64 = null;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (photo) {
        // Use a Promise to handle the asynchronous file reader operation
        const photoBase64Promise = new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(photo);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });

        // Wait for the photoBase64Promise to resolve
        photoBase64 = await photoBase64Promise;

        formData.append("photo", photoBase64);
        console.log(formData);
      }
      const jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });
      const jsonData = JSON.stringify(jsonObject);

      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        credentials: "include", // Include credentials for CORS
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      if (response.ok) {
        console.log("Blog Posted successfully");
        // You might want to navigate to another page or show a success message
      } else {
        console.error("Failed to post blog");
      }
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  return (
    <Container component='div' maxWidth='md'>
      <Typography variant='h4' align='center' gutterBottom>
        Post a Blog
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form>
          <TextField
            label='Title'
            variant='outlined'
            fullWidth
            margin='normal'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label='Content'
            multiline
            rows={4}
            variant='outlined'
            fullWidth
            margin='normal'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            type='file'
            variant='outlined'
            fullWidth
            margin='normal'
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <Grid container justifyContent='flex-end'>
            <Button
              variant='contained'
              color='primary'
              onClick={handlePost}
              style={{ marginTop: "10px" }}
            >
              Post Blog
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PostBlog;
