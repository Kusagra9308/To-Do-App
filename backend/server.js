const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- TASK SCHEMA ---------- */
const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

/* ---------- ROUTES ---------- */

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add task
app.post("/tasks", async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ error: "Task text is required" });
    }

    const task = await Task.create({
      text: req.body.text,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("SAVE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Toggle complete
app.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.sendStatus(404);

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: "Invalid task ID" });
  }
});

/* ---------- DATABASE + SERVER START ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err.message);
    process.exit(1);
  });
