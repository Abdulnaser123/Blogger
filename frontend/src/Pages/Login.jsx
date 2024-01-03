/** @format */

import { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Implement the login logic, send a POST request to your backend
    // const navigation = useNavigation();
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle the response
    const data = await response.json();
    const authToken = data.token;
    await localStorage.setItem("authToken", authToken);
    setAuthenticated(true);

    console.log(data); // Log the response for debugging
    if (data.message === "Login successful.") navigate("/");
  };
  return (
    <Container component='div' maxWidth='xs'>
      <Typography variant='h4' align='center' gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label='Email'
          variant='outlined'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={() => handleLogin({ email, password })}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
