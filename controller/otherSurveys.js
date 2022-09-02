const Survey = require("../models/survey");

const getAllOtherSurvey = async (req, res) => {
  const surveys = await Survey.find({ userId: { $ne: req.user._id } });
  res.status(200).json(surveys);
};

module.exports = getAllOtherSurvey;
