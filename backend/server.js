/** @format */

// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo");

const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB (Make sure MongoDB is running)

const User = require("./models/User");

mongoose
  .connect("mongodb://localhost:27017/mern-blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Replace with your frontend URL
    credentials: true,
  }),
);
// Setup session
app.use(
  session({
    secret: "4c971ae543027b4979802611a4df2bdb6341b41bfc6e799ddfbd405ac2798d80",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/",
    }), // Replace with your actual MongoDB connection string
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Routes
app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/users", userRoutes);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the MERN Blog API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
