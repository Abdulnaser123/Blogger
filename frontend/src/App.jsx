/** @format */

// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header/header";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PostBlog from "./Pages/PostBlog";
import About from "./Pages/About";

// import PostBlog from "./pages/PostBlog";
// import About from "./pages/About";
// import Profile from "./pages/Profile";

// Your authentication-related functions (you might want to move these to a separate file)

const checkAuthenticationStatus = () => {
  // Simulating a check with a token or a backend API call
  const isAuthenticated = localStorage.getItem("authToken") !== null;
  return isAuthenticated;
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    // Check authentication status when the component mounts
    const isAuthenticated = checkAuthenticationStatus();
    setAuthenticated(isAuthenticated);
  }, []);

  return (
    <Router>
      <Header
        isAuthenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />

        <Route
          path='/login'
          element={<Login setAuthenticated={setAuthenticated} />}
        />
        <Route path='/post-blog' element={<PostBlog />} />
        {/* <Route path='/about' component={About} />
        <Route path='/profile' component={Profile} /> */}
      </Routes>
    </Router>
  );
};

export default App;
