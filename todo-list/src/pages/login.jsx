import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = "https://to-do-app-q7ug.onrender.com";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body, #root {
          height: 100%;
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #fafafa;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: white;
          border-radius: 20px;
          padding: 40px 36px;
          box-shadow:
            0 30px 60px rgba(0,0,0,0.12),
            0 10px 20px rgba(0,0,0,0.06);
        }

        .login-header {
          margin-bottom: 28px;
          text-align: center;
        }

        .login-header h1 {
          font-size: 1.9rem;
          margin-bottom: 8px;
          color: #111827;
        }

        .login-header p {
          font-size: 0.95rem;
          color: #6b7280;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 20px;
        }

        .form-group input {
          padding: 14px 16px;
          font-size: 1rem;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          outline: none;
        }

        .form-group input:focus {
          border-color: #ef4444;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 14px;
          border: none;
          background: #ef4444;
          color: white;
          cursor: pointer;
          margin-top: 6px;
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error {
          color: #dc2626;
          font-size: 0.9rem;
          margin-bottom: 12px;
          text-align: center;
        }

        .footer {
          margin-top: 26px;
          text-align: center;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .footer a {
          color: #ef4444;
          text-decoration: none;
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px;
          }
        }
      `}</style>

      <div className="login-card">
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Log in to continue managing your tasks</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="footer">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
