const Responses = require("../models/responses");
const { ObjectId } = require("mongoose").Types;

const responseDetail = async (req, res) => {
  const person = await Responses
    .find({ userId: ObjectId(req.params.id) })
    .populate("userId")
    .select("name email");

  res.status(200).json(person[0].userId);
};

module.exports = responseDetail;