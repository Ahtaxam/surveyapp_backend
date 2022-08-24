const express = require("express");
const route = express.Router();

const Surveys = require("../controller/survey.js");
const isAuthorization = require("../middleware/isAuthorization.js");

const { getSurvey, getAllSurvey, createSurvey, updateSurvey, deleteSurvey } =
  Surveys;
route.get("/", getAllSurvey);
route.get("/:id", getSurvey);
route.post("/", createSurvey);
route.put("/:id", isAuthorization, updateSurvey);
route.delete("/:id", isAuthorization, deleteSurvey);

module.exports = route;
