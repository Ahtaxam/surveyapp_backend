const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

const signUpUsers = require("./router/user");
const loginuUser = require("./router/Auth");
const createSurvey = require("./router/survey");
const port = process.env.PORT || 8000;
const url = process.env.DBURL;
const cors = require("cors");
const isAuth = require("./middleware/isAuth");

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(() => {
    console.log("Could not Connect!...");
  });
app.use("/signup", signUpUsers);
app.use("/login", loginuUser);
app.use("/survey", isAuth, createSurvey);

app.listen(port, () => {
  console.log(`Server is listning on port ${port}`);
});
