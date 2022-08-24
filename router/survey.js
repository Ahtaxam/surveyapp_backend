const express = require("express");
const route = express.Router();

const Surveys = require("../controller/survey.js");
const isAuth = require("../middleware/isAuth.js");

const { singleSurvey, allSurveys, createSurvey, updateSurvey, deleteSurvey } =
  Surveys;
route.get("/", isAuth, allSurveys);
route.get("/:id", singleSurvey);
route.post("/", isAuth, createSurvey);
route.put("/:id", isAuth, updateSurvey);
route.delete("/:id", isAuth, deleteSurvey);

module.exports = route;
