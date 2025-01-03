const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error in form submission:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
