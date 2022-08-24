const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ["text", "number", "checkbox", "multiplechoice"],
        },
        options: {
          type: [String],
        },
      },
    ],
  },
});

const survey = mongoose.model("Survey", surveySchema);
module.exports = survey;
