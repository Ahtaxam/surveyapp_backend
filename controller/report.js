const Survey = require("../models/survey");
const Responses = require("../models/responses");
const fs = require("fs");
const survey = require("../models/survey");

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

    const writeStream = fs.createWriteStream(path);

    survey.questions.forEach((question) =>
      writeStream.write(question.title + ",")
    );
    writeStream.write("\n");

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

    writeStream.on("finish", () => {
      console.log(`wrote all the array data to file ${path}`);
    });

    // handle the errors on the write process
    writeStream.on("error", (err) => {
      console.error(`There is an error writing the file ${path} => ${err}`);
    });

    // close the stream
    writeStream.end();
    res.status(200).sendFile(path);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = report;
