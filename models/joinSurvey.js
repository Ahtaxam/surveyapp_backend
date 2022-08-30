const mongoose = require("mongoose");

const joinSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  surveyId: {
    type: String,
  },
  answers: {
    type: [
      {
        questionId: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
        },
      },
    ],
    required: true,
  },
});

const joinSurvey = mongoose.model("JoinSurvey", joinSchema);
module.exports = joinSurvey;
