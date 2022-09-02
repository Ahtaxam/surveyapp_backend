const express = require("express");
const route = express.Router();
const getAllOtherSurvey = require("../controller/otherSurveys.js");

route.get("/", getAllOtherSurvey);

module.exports = route;
