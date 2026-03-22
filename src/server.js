require("dotenv").config(); // Load environment variables

const app = require("./app"); // Import express app
const PORT = process.env.PORT || 5000;
exports.PORT = PORT;
const connectDB = require("./config/db");
connectDB();// connect database
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error("Server error:", err);
});
