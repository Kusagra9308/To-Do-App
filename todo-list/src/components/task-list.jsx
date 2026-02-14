import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://to-do-app-q7ug.onrender.com/api/tasks";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (!token) return;
    fetch(API_URL, { headers })
      .then((res) => (res.status === 401 ? navigate("/login") : res.json()))
      .then((data) => setTasks(Array.isArray(data) ? data : []))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, [headers, navigate, token]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ text: inputValue }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const toggleComplete = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "PATCH", headers });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t._id === id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE", headers });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className={`tasks-page ${dark ? "dark" : ""}`}>
      <style>{`
        .tasks-page {
          --bg: #f8f9fa; --card: #ffffff; --text: #2d3436; --accent: #6c5ce7; --border: #edf2f7;
          min-height: 100vh; background: var(--bg); display: flex; justify-content: center; padding: 50px 20px;
          font-family: 'Segoe UI', Roboto, sans-serif; transition: all 0.3s ease;
        }
        .dark {
          --bg: #1a202c; --card: #2d3748; --text: #f7fafc; --accent: #a29bfe; --border: #4a5568;
        }
        /* Increased Width & Better Shadow */
        .tasks-container {
          width: 100%; max-width: 600px; background: var(--card); border-radius: 20px;
          padding: 40px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .tasks-header { 
          display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; 
        }
        .tasks-title h1 { font-size: 2rem; margin: 0; color: var(--text); }
        .tasks-meta { color: #a0aec0; font-size: 0.95rem; margin-top: 5px; }

        /* Clean Theme Button */
        .theme-btn {
          background: var(--bg); border: 1px solid var(--border); width: 45px; height: 45px;
          border-radius: 12px; cursor: pointer; font-size: 1.2rem; display: flex;
          align-items: center; justify-content: center; transition: 0.2s;
        }
        .theme-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.05); }

        .task-input-group { display: flex; gap: 12px; margin-bottom: 30px; }
        .task-input-group input {
          flex: 1; padding: 14px 20px; border-radius: 12px; border: 2px solid var(--border);
          background: transparent; color: var(--text); font-size: 1rem; outline: none; transition: 0.2s;
        }
        .task-input-group input:focus { border-color: var(--accent); }
        .task-input-group button {
          background: var(--accent); color: white; border: none; padding: 0 25px;
          border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.2s;
        }

        .task-list { list-style: none; padding: 0; }
        .task-item {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px; border-radius: 12px; margin-bottom: 8px; transition: 0.2s;
          border: 1px solid transparent;
        }
        .task-item:hover { background: var(--bg); border-color: var(--border); }
        .task-content { display: flex; align-items: center; gap: 15px; font-size: 1.1rem; color: var(--text); }
        .task-content input { width: 20px; height: 20px; accent-color: var(--accent); cursor: pointer; }
        .done span { text-decoration: line-through; opacity: 0.5; }
        .delete-btn { background: none; border: none; cursor: pointer; font-size: 1.2rem; opacity: 0.3; transition: 0.2s; }
        .delete-btn:hover { opacity: 1; transform: scale(1.1); }
      `}</style>

      <div className="tasks-container">
        <header className="tasks-header">
          <div className="tasks-title">
            <h1>Inbox</h1>
            <p className="tasks-meta">
              {tasks.length} total • {completedCount} finished
            </p>
          </div>
          <button className="theme-btn" onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </header>

        <form className="task-input-group" onSubmit={addTask}>
          <input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?" 
          />
          <button type="submit">Add Task</button>
        </form>

        <ul className="task-list">
          {loading ? (
            <div className="tasks-meta">Loading your day...</div>
          ) : (
            tasks.map((t) => (
              <li key={t._id} className={`task-item ${t.completed ? "done" : ""}`}>
                <div className="task-content">
                  <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t._id)} />
                  <span>{t.text}</span>
                </div>
                <button className="delete-btn" onClick={() => deleteTask(t._id)}>🗑️</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;