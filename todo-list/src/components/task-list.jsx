import { useState, useEffect } from "react";

const API = "https://to-do-app-q7ug.onrender.com";

function Load({ task }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!task?.trim()) return;

    fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: task }),
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks(prev => [...prev, newTask]);
      });
  }, [task]);

  const toggleComplete = (id) => {
    fetch(`${API}/tasks/${id}`, { method: "PATCH" })
      .then(res => res.json())
      .then(updated => {
        setTasks(prev =>
          prev.map(t => (t._id === id ? updated : t))
        );
      });
  };

  const deleteTask = (id) => {
    fetch(`${API}/tasks/${id}`, { method: "DELETE" })
      .then(() => {
        setTasks(prev => prev.filter(t => t._id !== id));
      });
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li
          key={task._id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          {/* Left: checkbox + text */}
          <label className="task-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id)}
            />
            <span>{task.text}</span>
          </label>

          {/* Right: delete icon */}
          <button
            className="delete-btn"
            onClick={() => deleteTask(task._id)}
            aria-label="Delete task"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Load;
