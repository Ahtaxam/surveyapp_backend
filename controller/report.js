const Survey = require("../models/survey");
const Responses = require("../models/responses");
const fs = require("fs");

const report = async (req, res) => {
  let path = __dirname;
  path = path.replace("controller", "");
  path = path + "assets/report.csv";

  try {
    const survey = await Survey.findById(req.params.id).select(
      "questions -_id"
    );
    const responses = await Responses.find({ surveyId: req.params.id }).select(
      "answers.options -_id"
    );

    const fd = fs.openSync(path, "w");

    survey.questions.forEach((question) =>
      fs.writeSync(fd, question.title + ",")
    );
    fs.writeSync(fd, "\n");

    for (let i = 0; i < responses.length; i++) {
      for (let j = 0; j < responses[i].answers.length; j++) {
        if (responses[i].answers[j].options.length >= 2) {
          responses[i].answers[j].options =
            responses[i].answers[j].options.join(" ");
        }
        fs.writeSync(fd, responses[i].answers[j].options + " ,");
      }
      fs.writeSync(fd, "\n");
    }
    fs.closeSync(fd);

    res.status(200).sendFile(path);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = report;
