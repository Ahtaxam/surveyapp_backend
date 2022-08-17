const express = require("express");
const createUser = require("../controller/user");
const route = express.Router();

route.post("/", createUser);

module.exports = route;
