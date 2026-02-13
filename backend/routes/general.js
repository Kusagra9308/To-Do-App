const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const requireAuth = require("../middleware/auth-middleware");

// 🔐 protect all task routes
router.use(requireAuth);

// GET tasks for logged-in user
router.get("/", async (req, res) => {
  const tasks = await Task.find({
    user: req.userInfo.userId,
  }).sort({ createdAt: -1 });

  res.json(tasks);
});

// ADD task
router.post("/", async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ error: "Task text required" });
  }

  const task = await Task.create({
    text: req.body.text,
    user: req.userInfo.userId,
  });

  res.status(201).json(task);
});

// TOGGLE task
router.patch("/:id", async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.userInfo.userId,
  });

  if (!task) return res.sendStatus(404);

  task.completed = !task.completed;
  await task.save();

  res.json(task);
});

// DELETE task
router.delete("/:id", async (req, res) => {
  const deleted = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.userInfo.userId,
  });

  if (!deleted) return res.sendStatus(404);

  res.sendStatus(204);
});

module.exports = router;
