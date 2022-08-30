const Survey = require("../models/survey");
const joinSurvey = require("../models/joinSurvey");
const joi = require("joi");

const getJoinSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey.isPublic) {
      return res.status(401).json("You can not access this survey");
    }

    const isFilled = await joinSurvey.find({}).where({
      surveyId: req.params.id,
    });
    for (let i = 0; i < isFilled.length; i++) {
      if (isFilled[i].userId == req.user._id) {
        return res.status(401).json("You have already filled this survey");
      }
    }

    res.status(200).json(survey);
  } catch (e) {
    res.status(400).json("Survey not found");
  }
};

// function to save the response
const submitResponse = async (req, res) => {
  const resu = validateJoinSurvey(req.body);
  if (resu.error) {
    return res.status(400).json(resu.error.details[0].message);
  }

  const { surveyId, answers } = req.body;
  const result = new joinSurvey({
    userId: req.user._id,
    surveyId,
    answers,
  });
  try {
    const newSurvey = await result.save();
    res.status(201).json({
      message: "Response submitted successfully",
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// function to validate the request body
function validateJoinSurvey(response) {
  const { surveyId, answers } = response;

  const schema = joi.object({
    surveyId: joi.string().required(),
    answers: joi
      .array()
      .items(
        joi.object({
          questionId: joi.string().required(),
          options: joi.array().items(joi.string().required()).required(),
        })
      )
      .required()
      .min(1),
  });
  return schema.validate({ surveyId, answers });
}
module.exports = { getJoinSurvey, submitResponse };
