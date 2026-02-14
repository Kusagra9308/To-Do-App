import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://to-do-app-q7ug.onrender.com";

function TaskList({ task }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const authHeaders = token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : null;

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // GET tasks
  useEffect(() => {
    if (!authHeaders) return;

    fetch(`${API}/api/tasks`, { headers: authHeaders })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return [];
        }
        return res.json();
      })
      .then((data) => setTasks(Array.isArray(data) ? data : []))
      .catch(() => setTasks([]));
  }, [token, navigate]);

  // ADD task
  useEffect(() => {
    if (!task?.trim() || !authHeaders) return;

    fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ text: task }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((newTask) => {
        if (newTask) setTasks((prev) => [newTask, ...prev]);
      });
  }, [task, token]);

  // TOGGLE complete
const toggleComplete = async (id) => {
  try {
    const res = await fetch(`${API}/api/tasks/${id}`, {
      method: "PATCH",
      headers: authHeaders,
    });

    if (!res.ok) return;

    const updatedTask = await res.json();

    setTasks((prev) =>
      prev.map((t) => (t._id === id ? updatedTask : t))
    );
  } catch (err) {
    console.error("Toggle failed", err);
  }
};


  // DELETE task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API}/api/tasks/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!res.ok) return;

      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!token) return <p>Loading tasks…</p>;

  return (
    <>
      <style>{`
        .task-list {
          max-width: 520px;
          margin: 2rem auto;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-family: system-ui;
        }

        .empty {
          text-align: center;
          color: #9ca3af;
          font-style: italic;
        }

        .task {
          background: #fff;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 25px rgba(0,0,0,.08);
          transition: .2s;
        }

        .task:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(0,0,0,.12);
        }

        .task-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .task-left input {
          width: 18px;
          height: 18px;
          accent-color: #4f46e5;
        }

        .task.done .task-text {
          text-decoration: line-through;
          color: #9ca3af;
        }

        .delete-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          opacity: .6;
        }

        .delete-btn:hover {
          opacity: 1;
          transform: scale(1.1);
        }
      `}</style>

      <ul className="task-list">
        {tasks.length === 0 && <p className="empty">No tasks yet</p>}

        {tasks.map((task) => (
          <li
            key={task._id}
            className={`task ${task.completed ? "done" : ""}`}
          >
            <label className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task._id)}
              />
              <span className="task-text">{task.text}</span>
            </label>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task._id)}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;

