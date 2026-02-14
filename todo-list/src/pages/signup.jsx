import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const API = "https://to-do-app-q7ug.onrender.com/api";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      if (!data.accessToken) {
        setError("Signup succeeded but token was not returned.");
        return;
      }

      localStorage.setItem("token", data.accessToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
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

        .signup-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .signup-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: 20px;
          padding: 42px 38px;
          box-shadow:
            0 30px 60px rgba(0,0,0,0.12),
            0 10px 20px rgba(0,0,0,0.06);
        }

        .signup-header {
          margin-bottom: 26px;
          text-align: center;
        }

        .signup-header h1 {
          font-size: 1.9rem;
          margin-bottom: 6px;
          color: #111827;
        }

        .signup-header p {
          font-size: 0.95rem;
          color: #6b7280;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 18px;
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

        .signup-btn {
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

        .signup-btn:disabled {
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
          .signup-card {
            padding: 32px 24px;
          }
        }
      `}</style>

      <div className="signup-card">
        <div className="signup-header">
          <h1>Create account</h1>
          <p>Sign up to start managing your tasks</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

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

          <button className="signup-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
