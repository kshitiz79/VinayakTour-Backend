const express = require("express");
const router = express.Router();
const Form = require("./../models/formmodel");

router.post("/", async (req, res) => {
  const { name, number, package: interestedPackage } = req.body;
  try {
    const newForm = new Form({ name, number, package: interestedPackage });
    await newForm.save();
    res.status(201).json({ success: true, message: "Form submitted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving form data." });
  }
});

module.exports = router;
