const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const user = mongoose.model("user");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: "Your must logged in, key not given" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.jwt_secret, (err, payload) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "You must be logged in, token invalid" });
    }
    const { _id } = payload;
    user.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
  next();
};
