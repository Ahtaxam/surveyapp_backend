const express = require("express");
const route = express.Router();
const Responses = require("../controller/joinSurvey");

route.get("/:id", Responses.validateSurveyAccess);
route.post("/", Responses.submitResponse);

module.exports = route;
