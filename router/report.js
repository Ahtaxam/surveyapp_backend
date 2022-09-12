const express = require("express");
const router = express.Router();
const report = require("../controller/report.js");

router.get("/:id", report);

module.exports = router;
