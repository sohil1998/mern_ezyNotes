const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user = mongoose.model("user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

router.post("/users/:id", (req, res) => {
  user
    .findById(req.params.id)
    .select("-password")
    .then((result) => {
      res.send({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
