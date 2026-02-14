import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/task-list";

function Loginedpage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) return null;

  const [input, setInput] = useState("");
  const [taskToAdd, setTaskToAdd] = useState("");

  const onSubmit = () => {
    if (!input.trim()) return;
    setTaskToAdd(input);
    setInput("");
  };

  return (
    <>
      {/* ✅ Page-level CSS */}
      <style>{`
        /* Reset + full height */
        html, body, #root {
          height: 100%;
          margin: 0;
        }

        /* Full screen app */
        .app {
  min-height: 100vh;
  width: 100%;
  background: #f3f4f6;

  display: flex;
  justify-content: center; /* center page content */
  padding: 32px 16px;
}

        h1 {
          margin: 12px 0 20px;
          font-size: 24px;
        }

        /* Input area */
        .input-group {
          width: 100%;
          // max-width: 520px;
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .input-group input {
          flex: 1;
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
        }

        .input-group button {
          padding: 12px 16px;
          font-size: 16px;
          border-radius: 8px;
          border: none;
          background: #4f46e5;
          color: white;
          cursor: pointer;
        }

        .input-group button:hover {
          opacity: 0.9;
        }

        /* Make sure task list can scroll on mobile */
        .task-list {
          width: 100%;
          // max-width: 520px;
          flex: 1;
          overflow-y: auto;
        }

        /* Mobile tweaks */
        @media (max-width: 480px) {
          h1 {
            font-size: 20px;
          }

          .input-group {
            flex-direction: column;
          }

          .input-group button {
            width: 100%;
          }
        }
      `}</style>

      <div className="app">
        {/* <div className="input-group">
          <input
            placeholder="Add a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={onSubmit}>Add</button>
        </div> */}

        <TaskList task={taskToAdd} />
      </div>
    </>
  );
}

export default Loginedpage;
