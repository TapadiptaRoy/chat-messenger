const express = require("express");
const cors = require("cors");
const app=express();
app.use(express.json());
app.use(cors());
// Load routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
app.use((req, res, next) => {
  next();
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);

module.exports=app;