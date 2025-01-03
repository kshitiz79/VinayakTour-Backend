const express = require("express");
const { protect } = require("../middleware/auth");
const Review = require("../models/reviewmodel"); // Ensure correct path

const router = express.Router();

// Create a review
router.post("/", protect, async (req, res) => {
  try {
    const { content, rating } = req.body;

    console.log("Request Body:", req.body);

    if (!content || !rating) {
      console.log("Missing content or rating");
      return res.status(400).json({ success: false, message: "Content and rating are required" });
    }

    const review = await Review.create({
      user: req.user._id,
      content,
      rating,
    });

    console.log("Review created successfully:", review);

    res.status(201).json({ success: true, review });
  } catch (error) {
    console.error("Error creating review:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
