const Survey = require("../models/survey");
const Responses = require("../models/responses");
const joi = require("joi");
const { ObjectId } = require("mongoose").Types;

const validateSurveyAccess = async (req, res, next) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey.isPublic) {
      return res.status(401).json("You can not access this survey");
    }

    const isFilled = await Responses.find({
      surveyId: req.params.id,
      userId: req.user._id,
    });
    if (isFilled.length > 0) {
      return res.status(401).json("You have already filled this survey");
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
  const answer = answers.map((answer) => {
      return {
        questionId: ObjectId(answer.questionId),
        options: answer.options,
      };
    }),
    id = ObjectId(surveyId);
  const result = new Responses({
    userId: req.user._id,
    surveyId: id,
    answers: answer,
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
module.exports = { validateSurveyAccess, submitResponse };
