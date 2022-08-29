const express = require("express");
const route = express.Router();
const getJoinSurvey = require("../controller/joinSurvey");

route.get("/:id", getJoinSurvey);

module.exports = route;
