import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/task-list";

function Loginedpage() {
  const navigate = useNavigate();

  // ✅ DEFINE TOKEN HERE
  const token = localStorage.getItem("token");

  // ⛔ Block access if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null; // ⛔ stop render completely

  const [input, setInput] = useState("");
  const [taskToAdd, setTaskToAdd] = useState("");

  const onSubmit = () => {
    if (!input.trim()) return;
    setTaskToAdd(input);
    setInput("");
  };

  return (
    <div className="app">
      <h1>Tasks</h1>

      <div className="input-group">
        <input
          placeholder="Add a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={onSubmit}>Add</button>
      </div>

      <TaskList task={taskToAdd} />
    </div>
  );
}

export default Loginedpage;
