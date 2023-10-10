require("dotenv").config();
const config = {
  jwtPrivateKey: process.env.JWTPRIVATEKEY,
};

module.exports = config;
