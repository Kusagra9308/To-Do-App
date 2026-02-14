import { useNavigate } from "react-router-dom";
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("Signup response:", data);

      // ❌ Backend error
      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      // ❌ Token missing (CRITICAL GUARD)
      if (!data.accessToken) {
        setError("Signup succeeded but authentication token was not returned.");
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", data.accessToken);

      // ✅ Redirect ONLY after token is saved
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <style>{`
        * {
          box-sizing: border-box;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9fafb;
        }

        .auth-box {
          width: 380px;
          background: #ffffff;
          padding: 32px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .auth-box h1 {
          font-size: 1.5rem;
          margin-bottom: 6px;
          font-weight: 600;
          color: #111827;
        }

        .auth-box p {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 24px;
        }

        .auth-box form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .auth-box input {
          padding: 12px;
          font-size: 0.9rem;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          outline: none;
        }

        .auth-box input:focus {
          border-color: #6366f1;
        }

        .auth-box button {
          margin-top: 10px;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #6366f1;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
        }

        .auth-box button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error {
          font-size: 0.8rem;
          color: #dc2626;
        }

        .auth-footer {
          margin-top: 18px;
          font-size: 0.8rem;
          color: #6b7280;
          text-align: center;
        }

        .auth-footer a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
        }
      `}</style>

      <div className="auth-box">
        <h1>Create account</h1>
        <p>Sign up to start managing your tasks</p>

        <form onSubmit={handleSubmit}>
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

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
