const JoinSurvey = require("../models/joinSurvey");

const surveyResponses = async (req, res) => {
  try {
    const surveys = await JoinSurvey.find({ surveyId: req.params.id });
    res.status(200).json(surveys);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = surveyResponses;
