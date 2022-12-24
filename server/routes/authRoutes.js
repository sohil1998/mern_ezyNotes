const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user = mongoose.model("user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

router.post("/signup", (req, res) => {
  const { name, email, password, mobile } = req.body;
  if (!email || !password || !name) {
    return res.send({ msg: "Please fill all the fields", status: 0 });
  }
  user.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.send({ msg: "Invalid credentials", status: 0 });
    }
    const User = new user({
      name,
      email,
      password,
      mobile,
    });
    try {
      await User.save();
      const token = jwt.sign({ _id: User._id }, process.env.jwt_secret);
      res.send({ token, msg: "Account created successfully" });
    } catch (error) {
      console.log("db error", error);
      return res.status(422).send({ error: error.message });
    }
  });
});

router.post("/signin", async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.send({ msg: "Please fill all the fields", status: 0 });
  }
  const savedUser = await user.findOne({ email: email });
  const savedUserData = await user.find({ email: email }).select("-password");

  if (!savedUser) {
    return res.send({ msg: "Invalid credentials", status: 0 });
  }

  try {
    bcrypt.compare(password, savedUser.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ _id: savedUser._id }, process.env.jwt_secret);
        res.send({
          token,
          msg: "Login successful",
          data: savedUserData,
        });
      } else {
        return res.send({
          msg: "Invalid credentials",
          status: 0,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
