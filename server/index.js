const express = require("express");
const port = 3000;

const app = express();
const bodyParser = require("body-parser");

require("./db");
require("./model/user");

const authRoutes = require("./routes/authRoutes");
const getUserDataRoutes = require("./routes/getUserDataRoutes");
const requireToken = require("./middlewares/authTokenRequired");
const noteRouter = require("./routes/noteRouter");

app.use(bodyParser.json());
app.use(authRoutes);
app.use(getUserDataRoutes);
app.use(noteRouter);

app.get("/", requireToken, (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log("hrllow");
});
