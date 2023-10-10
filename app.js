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

app.get("/", (req, res) => {
  res.send("Hello Seerver!");
});

app.use("/api/v1/signup", signUpUsers);
app.use("/api/v1/login", loginuUser);
app.use("/api/v1/survey", isAuth, createSurvey);
app.use("/api/v1/join", isAuth, joinSurvey);
app.use("/api/v1/otherSurveys", isAuth, showOtherSurveys);
app.use("/api/v1/responses", isAuth, surveyResponses);
app.use("/api/v1/download", download);
app.use("/api/v1/responsedetail", responseDetail);

app.listen(port, () => {
  console.log(`Server is listning on port ${port}`);
});
