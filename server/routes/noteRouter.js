const express = require("express");
const Note = require("../model/notes");
const auth = require("../middlewares/authTokenRequired");
const router = new express.Router();

//creat note
router.post("/notes/create", async (req, res) => {
  const { title, content, updateDate, userId } = req.body;
  const note = new Note({
    title,
    content,
    updateDate,
    userId,
  });
  try {
    await note.save();
    res.status(201).send({
      note,
      msg: "Note saved successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//get all note
router.post("/notes/get", async (req, res) => {
  const { userId } = req.body;
  Note.find({ userId: userId }).then(async (result) => {
    if (result) {
      res.send({ data: result });
    }
  });
});

//get note data by id
router.post("/notes/getbyid", async (req, res) => {
  const { noteId } = req.body;
  Note.find({ _id: noteId }).then(async (result) => {
    if (result) {
      res.send({ data: result });
    }
  });
});

//update note
router.post("/notes/updateById", async (req, res) => {
  const { title, content, updateDate, noteId } = req.body;
  const noteOfId = await Note.findOne({ noteId: noteId });
  try {
    await noteOfId.updateOne({
      title: title || noteOfId.title,
      content: content || noteOfId.content,
      updateDate,
      noteId,
    });
    res.status(201).send({
      msg: "Note updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
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
