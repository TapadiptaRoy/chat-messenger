const express = require("express");
const cors = require("cors");
const app=express();
app.use(express.json());
app.use(cors());
// Load routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

module.exports=app;