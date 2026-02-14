import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://to-do-app-q7ug.onrender.com/api/tasks";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token],
  );

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
  * {
    box-sizing: border-box;
  }

  .tasks-page {
    --bg: #f4f6fb;
    --card: #ffffff;
    --text: #1f2933;
    --muted: #6b7280;
    --accent: #6366f1;
    --border: #e5e7eb;
width : 100%;
    min-height: 100vh;
    background: linear-gradient(180deg, var(--bg), #eef1f7);
    display: flex;
    justify-content: center;
    padding: 60px 24px;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    transition: 0.3s ease;
  }

  .dark {
    --bg: #0f172a;
    --card: #111827;
    --text: #f9fafb;
    --muted: #9ca3af;
    --accent: #818cf8;
    --border: #1f2937;
    background: linear-gradient(180deg, #020617, #020617);
  }

  /* Wider, app-like container */
  .tasks-container {
    width: 100%;
    max-width: 900px;
    background: var(--card);
    border-radius: 24px;
    padding: 48px;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.08),
      0 8px 16px rgba(0, 0, 0, 0.04);
  }

  .tasks-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  .tasks-title h1 {
    font-size: 2.4rem;
    font-weight: 700;
    margin: 0;
    color: var(--text);
  }

  .tasks-meta {
    margin-top: 6px;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .theme-btn {
    background: transparent;
    border: 1px solid var(--border);
    width: 48px;
    height: 48px;
    border-radius: 14px;
    cursor: pointer;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s ease;
  }

  .theme-btn:hover {
    transform: translateY(-2px);
    background: var(--bg);
  }

  .task-input-group {
    display: flex;
    gap: 16px;
    margin-bottom: 36px;
  }

  .task-input-group input {
    flex: 1;
    padding: 16px 20px;
    border-radius: 14px;
    border: 2px solid var(--border);
    background: transparent;
    color: var(--text);
    font-size: 1rem;
    outline: none;
    transition: 0.2s ease;
  }

  .task-input-group input:focus {
    border-color: var(--accent);
  }

  .task-input-group button {
    background: var(--accent);
    color: white;
    border: none;
    padding: 0 32px;
    border-radius: 14px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .task-input-group button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

 .task-list {
  width: 100%;
  flex: 1;
  overflow-y: auto;
}


  .task-item {
    display: flex;
    width : 800px;
    height: 69px;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px;
    border-radius: 14px;
    margin-bottom: 10px;
    background: transparent;
    transition: 0.2s ease;
    border: 1px solid var(--border);
  }

  .task-item:hover {
    background: var(--bg);
  }

  .task-content {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 1.05rem;
    color: var(--text);
  }

  .task-content input {
    width: 22px;
    height: 22px;
    accent-color: var(--accent);
    cursor: pointer;
  }

  .done span {
    text-decoration: line-through;
    opacity: 0.45;
  }

  .delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0.4;
    transition: 0.2s ease;
  }

  .delete-btn:hover {
    opacity: 1;
    transform: scale(1.15);
  }

  @media (max-width: 768px) {
    .tasks-container {
      padding: 32px 24px;
    }

    .tasks-title h1 {
      font-size: 2rem;
    }
  }
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
              <li
                key={t._id}
                className={`task-item ${t.completed ? "done" : ""}`}
              >
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleComplete(t._id)}
                  />
                  <span>{t.text}</span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(t._id)}
                >
                  🗑️
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
