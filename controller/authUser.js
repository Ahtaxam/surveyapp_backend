const User = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authUser = async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json("Invalid username or password");
    return;
  } else {
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(400).json("Invalid Username or password");
    }
    const token = jwt.sign({ _id: user._id }, config.jwtPrivateKey);
    res
      .cookie("expressToken", token, {
        expire: 360000 + Date.now(),
        httpOnly: false,
      })
      .status(200)
      .send({
        message: "Login Successsfully...",
        email: user.email,
        name: user.name,
        token: token,
      });
  }
};

function validateUser(user) {
  let email = user.email;
  let password = user.password;

  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  });

  return schema.validate({ email, password });
}
module.exports = authUser;
