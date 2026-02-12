import { useState } from "react";
import Load from "./components/task-list";
import "./App.css";
const API = import.meta.env.VITE_API_URL;



function App() {
  const [input, setInput] = useState("");
  const [taskToAdd, setTaskToAdd] = useState("");

  const onsubmit = () => {
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
        <button onClick={onsubmit}>Add</button>
      </div>

      <h2>List</h2>
      <Load task={taskToAdd} />
    </div>
  );
}

export default App;
