const User = require("../models/user");
const _ = require("lodash");
const joi = require("joi");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ message: "Email Already register " });
    return;
  } else {
    let user = new User(_.pick(req.body, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
      user = await user.save();
      res.status(200).json({
        message: "user created successfully",
        data: _.pick(user, ["_id", "name", "email"]),
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};

function validateUser(user) {
  const { name, email, password } = user;

  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().min(8).required(),
  });

  return schema.validate({ name, email, password });
}

module.exports = createUser;
