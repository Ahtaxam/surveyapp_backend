const express = require("express");
const router = express.Router();
const surveyResponses = require("../controller/surveyResponses.js");

router.get("/:id", surveyResponses);

module.exports = router;
