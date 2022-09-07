const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();

const signUpUsers = require("./router/user");
const loginuUser = require("./router/Auth");
const createSurvey = require("./router/survey");
const joinSurvey = require("./router/joinSurvey");
const showOtherSurveys = require("./router/otherSurveys");
const surveyResponses = require("./router/surveyResponses");
const download = require("./router/report");
const responseDetail = require("./router/responseDetail");
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
app.use("/join", isAuth, joinSurvey);
app.use("/otherSurveys", isAuth, showOtherSurveys);
app.use("/responses", isAuth, surveyResponses);
app.use("/download", download);
app.use("/responsedetail", responseDetail);
app.listen(port, () => {
  console.log(`Server is listning on port ${port}`);
});
