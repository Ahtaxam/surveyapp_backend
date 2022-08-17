require("dotenv").config();
const config = {
  jwtPrivateKey: process.env.jwtPrivateKey,
};

module.exports = config;
