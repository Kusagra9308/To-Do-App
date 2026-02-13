const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 🔐 TEMP middleware (remove when real auth is ready)
router.use((req, res, next) => {
  // simulate logged-in user
  req.user = { id: "REPLACE_WITH_USER_ID" };
  next();
});

// Get tasks for logged-in user
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add task for logged-in user
router.post("/tasks", async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ error: "Task text is required" });
    }

    const task = await Task.create({
      text: req.body.text,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("SAVE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Toggle complete (only if task belongs to user)
router.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) return res.sendStatus(404);

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

// Delete task (only if owned by user)
router.delete("/tasks/:id", async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

module.exports = router;
