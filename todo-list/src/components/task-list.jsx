import { useState, useEffect } from "react";

const API = "http://localhost:5000";

function Load({ task }) {
  const [tasks, setTasks] = useState([]);

  // 1️⃣ Load tasks from backend
  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  // 2️⃣ Add new task
  useEffect(() => {
    if (!task || !task.trim()) return;

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

  // 3️⃣ Toggle complete
  const toggleComplete = (id) => {
    fetch(`${API}/tasks/${id}`, {
      method: "PATCH",
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(prev =>
          prev.map(t => (t.id === id ? updated : t))
        );
      });
  };

  // 4️⃣ Delete task
  const deleteTask = (id) => {
    fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks(prev => prev.filter(t => t.id !== id));
    });
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li
          key={task.id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          <span onClick={() => toggleComplete(task.id)}>
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>×</button>
        </li>
      ))}
    </ul>
  );
}

export default Load;
