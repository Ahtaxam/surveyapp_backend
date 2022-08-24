const Survey = require("../models/survey");

async function isAuthorization(req, res, next) {
  const survey = await Survey.findById(req.params.id);
  const userId = survey.userId;
  if (survey.userId != req.user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
module.exports = isAuthorization;
