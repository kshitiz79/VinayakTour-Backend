const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  package: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Form", formSchema);
