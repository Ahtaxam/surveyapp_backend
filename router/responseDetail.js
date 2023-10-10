const express = require("express");
const router = express.Router();
const responseDetail = require("../controller/responseDetail.js");

router.get("/:id", responseDetail);

module.exports = router;
