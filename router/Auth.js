const express = require("express");
const Auth = express.Router();
const authUser = require("../controller/authUser");
Auth.post("/", authUser);

module.exports = Auth;
