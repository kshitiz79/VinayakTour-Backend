const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

// Middleware: Enable CORS with specific options
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,              // Allow cookies and credentials
}));

// Middleware: Parse JSON request bodies
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Import Routes
const formRoutes = require("./src/routes/formroute");
const authRoutes = require("./src/routes/auth");
const reviewRoutes = require("./src/routes/reviewroute"); // Add Review Routes

// Register Routes
app.use("/api/form", formRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes); // Add the review routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
