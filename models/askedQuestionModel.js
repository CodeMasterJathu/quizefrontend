const mongoose = require("mongoose");

const askedQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answer: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AskedQuestion", askedQuestionSchema);
