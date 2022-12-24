const express = require("express");
const Note = require("../model/notes");
const auth = require("../middlewares/authTokenRequired");
const router = new express.Router();

//creat note
router.post("/notes/create", auth, async (req, res) => {
  const note = new Note({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await note.save();
    res.status(201).send({
      note,
      message: "Note saved successfully",
    });
  } catch (error) {
    res.status(500).send(e);
  }
});

//get all note
router.post("/notes/get", auth, async (req, res) => {
  try {
    await req.user.populate("notes");
    res.status(200).send(req.user.notes);
  } catch (error) {
    res.status(500).send(e);
  }
});

//delete note
router.delete("/notes/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id });
    if (!note) {
      return res.status(404).send();
    }
    res.send({ message: "Note deleted" });
  } catch (error) {
    res.status(500).send(e);
  }
});

module.exports = router;
