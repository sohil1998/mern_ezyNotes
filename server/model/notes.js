const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  updateDate: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
