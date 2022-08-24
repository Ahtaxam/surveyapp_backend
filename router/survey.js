const express = require("express");
const route = express.Router();

const Surveys = require("../controller/survey.js");
const isAuthorized = require("../middleware/isAuthorized.js");

const { getSurvey, getAllSurvey, createSurvey, updateSurvey, deleteSurvey } =
  Surveys;
route.get("/", getAllSurvey);
route.get("/:id", getSurvey);
route.post("/", createSurvey);
route.put("/:id", isAuthorized, updateSurvey);
route.delete("/:id", isAuthorized, deleteSurvey);

module.exports = route;
