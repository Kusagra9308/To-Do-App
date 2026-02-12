import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

if (!API) {
  throw new Error("VITE_API_URL is not defined");
}

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
          <span onClick={() => toggleComplete(task._id)}>
            {task.text}
          </span>
          <button onClick={() => deleteTask(task._id)}>×</button>
        </li>
      ))}
    </ul>
  );
}

export default Load;
