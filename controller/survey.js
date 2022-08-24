const Survey = require("../models/survey");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const joi = require("joi");

// function to get all surveys from database
const getAllSurvey = async (req, res) => {
  const sureys = await Survey.find({ userId: req.user._id });
  res.status(200).json(sureys);
};

// function to get survey by id from database
const getSurvey = async (req, res) => {
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
  const { name, description, questions, isPublic } = req.body;
  const survey = new Survey({
    name,
    description,
    questions,
    isPublic,
    userId: req.user._id,
  });

  try {
    const newSurvey = await survey.save();
    res.status(201).json({
      message: "Survey created successfully",
      data: newSurvey,
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
    const survey = await Survey.findById(req.params.id);

    if (!survey) return res.status(404).json({ message: "Survey not found" });

    const { name, description, questions, isPublic } = req.body;
    survey.name = name;
    survey.description = description;
    survey.questions = questions;
    survey.isPublic = isPublic;
    const updatedSurvey = await survey.save();
    res.status(200).json({
      message: "Survey updated successfully",
      data: updatedSurvey,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// function to delete survey from database
const deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) return res.status(404).json({ message: "Survey not found" });

    await Survey.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Survey deleted successfully" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

// joi schema  to validate survey
function validateSurvey(survey) {
  const { name, description, questions, isPublic } = survey;

  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    isPublic: joi.boolean(),
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
          .when("type", { is: "checkbox", then: joi.required() })
          .when("type", { is: "multiplechoice", then: joi.required() }),
      })
    ),
  });

  return schema.validate({ name, description, questions, isPublic });
}

module.exports = {
  getAllSurvey,
  createSurvey,
  getSurvey,
  deleteSurvey,
  updateSurvey,
};
