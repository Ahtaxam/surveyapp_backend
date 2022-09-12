const Responses = require("../models/responses");

const surveyResponses = async (req, res) => {
  try {
    const surveys = await Responses.find({ surveyId: req.params.id });
    res.status(200).json(surveys);
  } catch (err) {
    res.status(400).json("Survey not found");
  }
};

module.exports = surveyResponses;
