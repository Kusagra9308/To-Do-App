import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://to-do-app-q7ug.onrender.com";

function TaskList({ task }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ⛔ HARD STOP if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // ⛔ DO NOT RENDER OR FETCH WITHOUT TOKEN
  if (!token) return null;

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // ✅ GET tasks (fail-safe)
  useEffect(() => {
    fetch(`${API}/api/tasks`, { headers: authHeaders })
      .then(async (res) => {
        if (!res.ok) {
          console.error("Unauthorized, logging out");
          localStorage.removeItem("token");
          navigate("/login");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch(() => setTasks([]));
  }, [token, navigate]);

  // ✅ ADD task
  useEffect(() => {
    if (!task?.trim()) return;

    fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ text: task }),
    })
      .then((res) => res.ok ? res.json() : null)
      .then((newTask) => {
        if (newTask) {
          setTasks((prev) => [newTask, ...prev]);
        }
      });
  }, [task, token]);

  const toggleComplete = (id) => {
    fetch(`${API}/api/tasks/${id}`, {
      method: "PATCH",
      headers: authHeaders,
    })
      .then((res) => res.json())
      .then((updated) => {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? updated : t))
        );
      });
  };

  const deleteTask = (id) => {
    fetch(`${API}/api/tasks/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    }).then(() => {
      setTasks((prev) => prev.filter((t) => t._id !== id));
    });
  };

  return (
    <ul className="task-list">
      {tasks.length === 0 && <p>No tasks yet</p>}

      {tasks.map((task) => (
        <li
          key={task._id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id)}
            />
            {task.text}
          </label>

          <button onClick={() => deleteTask(task._id)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
