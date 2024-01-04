/** @format */

// src/components/Header.js
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ isAuthenticated, setAuthenticated }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Implement the logout logic
    localStorage.removeItem("authToken");
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar position='static'>
      <Toolbar style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant='h6'
            component={Link}
            to='/'
            style={{ textDecoration: "none", color: "white" }}
          >
            My Blog
          </Typography>
        </div>
        <div>
          <Button component={Link} to='/about' color='inherit'>
            About
          </Button>
          {isAuthenticated ? (
            <>
              <Button component={Link} to='/profile' color='inherit'>
                Profile
              </Button>
              <Button component={Link} to='/post-blog' color='inherit'>
                Post Blog
              </Button>
            </>
          ) : (
            <Button component={Link} to='/login' color='inherit'>
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button onClick={handleLogout} color='inherit'>
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
