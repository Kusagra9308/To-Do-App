import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-page">
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #fafafa, #f3f4f6);
          padding: 24px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .auth-card {
          width: 420px;
          max-width: 100%;
          background: #ffffff;
          padding: 40px 32px;
          border-radius: 18px;
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.06),
            0 6px 14px rgba(0, 0, 0, 0.04);
        }

        .auth-card h1 {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 8px;
          text-align: center;
          color: #111827;
        }

        .auth-card p {
          font-size: 0.9rem;
          color: #6b7280;
          text-align: center;
          margin-bottom: 28px;
        }

        .auth-card form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .auth-card input {
          padding: 12px 14px;
          font-size: 0.95rem;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          outline: none;
          transition: border 0.15s ease;
        }

        .auth-card input:focus {
          border-color: #6366f1;
        }

        .auth-card button {
          margin-top: 10px;
          padding: 12px;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 12px;
          border: none;
          background: #6366f1;
          color: #ffffff;
          cursor: pointer;
          transition: box-shadow 0.15s ease, opacity 0.15s ease;
        }

        .auth-card button:hover {
          box-shadow: 0 8px 18px rgba(99, 102, 241, 0.35);
          opacity: 0.95;
        }

        .auth-footer {
          margin-top: 20px;
          font-size: 0.8rem;
          text-align: center;
          color: #6b7280;
        }

        .auth-footer a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
        }
      `}</style>

      <div className="auth-card">
        <h1>Welcome back</h1>
        <p>Log in to continue managing your tasks</p>

        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button type="submit">Login</button>
        </form>

        <div className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
