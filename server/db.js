const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_URL)
  .then(() => {
    console.log("connectiied to db");
  })
  .catch((e) => {
    console.log(e);
  });
