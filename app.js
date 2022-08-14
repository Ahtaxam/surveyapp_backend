const express = require("express");
const mongoose = require("mongoose");
const signUpUsers = require("./router/user");
const loginuUser = require("./router/Auth");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;
const url = "mongodb://localhost/surveyapp";
const cors = require("cors");

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

app.listen(port, () => {
  console.log(`Server is listning on port ${port}`);
});
