const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// TEMP in-memory storage
let tasks = [];

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    text: req.body.text,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Toggle complete
app.patch("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.sendStatus(404);

  task.completed = !task.completed;
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.sendStatus(204);
});

// Start server (ALWAYS LAST)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
