const express = require("express");
const route = express.Router();
const Surveys = require("../controller/survey.js");

const { survey, surveys, createSurvey, updateSurvey, deleteSurvey } = Surveys;
route.get("/", surveys);
route.get("/:id", survey);
route.post("/", createSurvey);
route.put("/:id", updateSurvey);
route.delete("/:id", deleteSurvey);

module.exports = route;
