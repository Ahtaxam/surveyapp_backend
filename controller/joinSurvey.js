const Survey = require("../models/survey");

const getJoinSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id).select(
      "-questions._id"
    );
    if (!survey.isPublic) {
      return res.status(401).json("You can not access this survey");
    }
    res.status(200).json(survey);
  } catch (e) {
    res.status(400).json("Invalid survey id");
  }
};

module.exports = getJoinSurvey;
