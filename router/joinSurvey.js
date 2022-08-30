const express = require("express");
const route = express.Router();
const joinSurvey = require("../controller/joinSurvey");

route.get("/:id", joinSurvey.getJoinSurvey);
route.post("/", joinSurvey.submitResponse);

module.exports = route;
