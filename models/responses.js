const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const responseSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  surveyId: {
    type: ObjectId,
  },
  answers: {
    type: [
      {
        questionId: {
          type: ObjectId,
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

const response = mongoose.model("JoinSurvey", responseSchema);
module.exports = response;
