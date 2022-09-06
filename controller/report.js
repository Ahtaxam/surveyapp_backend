const Survey = require("../models/survey");
const JoinSurvey = require("../models/joinSurvey");
const fs = require("fs");
const path = require("path");

const report = async (req, res) => {
  const survey = await Survey.findById(req.params.id).select("questions -_id");
  const responses = await JoinSurvey.find({ surveyId: req.params.id }).select(
    "answers.options -_id"
  );

  let path = __dirname;
  path = path.replace("controller", "");
  path = path + "assets/report.csv";
  const writeStream = fs.createWriteStream(path);
  survey.questions.forEach((question) =>
    writeStream.write(question.title + ",")
  );
  writeStream.write("\n");

  writeStream.on("finish", () => {
    console.log(`wrote all the array data to file ${path}`);
  });

  // handle the errors on the write process
  writeStream.on("error", (err) => {
    console.error(`There is an error writing the file ${path} => ${err}`);
  });

  for (let i = 0; i < responses.length; i++) {
    for (let j = 0; j < responses[i].answers.length; j++) {
      if (responses[i].answers[j].options.length >= 2) {
        responses[i].answers[j].options =
          responses[i].answers[j].options.join(" ");
      }
      writeStream.write(responses[i].answers[j].options + " ,");
    }
    writeStream.write("\n");
  }

  // close the stream
  writeStream.end();
  const name = "report.csv";
  res.status(200).download(path, name);
};

module.exports = report;
