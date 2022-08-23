const Survey = require("../models/survey");
const joi = require("joi");

// function to get all surveys from database
const surveys = async (req, res) => {
  const sureys = await Survey.find({});
  res.status(200).json(sureys);
};

// function to get survey by id from database
const survey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    res.status(200).json(survey);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// function to create survey in database
const createSurvey = async (req, res) => {
  const result = validateSurvey(req.body);
  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }
  const survey = new Survey({
    name: req.body.name,
    description: req.body.description,
    questions: req.body.questions,
  });

  try {
    const newSurvey = await survey.save();
    res.status(201).json({
      message: "Survey created successfully",
      survey: newSurvey,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// function to update survey in database
const updateSurvey = async (req, res) => {
  const result = validateSurvey(req.body);
  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }
  try {
    const survey = await Survey.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          questions: req.body.questions,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Survey updated successfully",
      survey: survey,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// function to delete survey from database
const deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Survey deleted successfully",
      survey,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// joi schema  to validate survey
function validateSurvey(survey) {
  const { name, description, questions } = survey;

  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    questions: joi.array().items(
      joi.object({
        title: joi.string().required(),
        type: joi
          .string()
          .required()
          .valid("text", "number", "checkbox", "multiplechoice"),
        options: joi
          .array()
          .items(joi.string())
          .min(1)
          .when("type", { is: "checkbox", then: joi.required() })
          .when("type", { is: "multiplechoice", then: joi.required() }),
      })
    ),
  });

  return schema.validate({ name, description, questions });
}

module.exports = { surveys, createSurvey, survey, deleteSurvey, updateSurvey };
