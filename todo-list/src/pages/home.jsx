import { Link } from "react-router-dom";
import Login from "./home.jsx";
import Signup from "./signup";

function Home() {
  return (
    <div className="home">
      <style>{`
        .home {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #fafafa, #f3f4f6);
          padding: 24px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .card {
          width: 440px;
          max-width: 100%;
          background: #ffffff;
          padding: 40px 34px;
          border-radius: 18px;
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.06),
            0 6px 14px rgba(0, 0, 0, 0.04);
        }

        .top-bar {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-bottom: 28px;
        }

        .top-btn {
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 0.8rem;
          text-decoration: none;
          font-weight: 500;
          color: #374151;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          transition: background 0.15s ease, border 0.15s ease;
        }

        .top-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        h1 {
          font-size: 1.9rem;
          font-weight: 600;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
          color: #111827;
          text-align: center;
        }

        p {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 32px;
          text-align: center;
        }

        .features {
          display: flex;
          justify-content: space-between;
          margin-bottom: 36px;
          text-align: center;
        }

        .feature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #374151;
        }

        .feature span {
          font-size: 1.6rem;
        }

        .cta {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .start-btn {
          padding: 14px 26px;
          border-radius: 14px;
          background: #6366f1;
          color: #ffffff;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }

        .start-btn:hover {
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);
        }

        .secondary-btn {
          padding: 14px 26px;
          border-radius: 14px;
          background: #f9fafb;
          color: #374151;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          border: 1px solid #e5e7eb;
          transition: background 0.15s ease;
        }

        .secondary-btn:hover {
          background: #f3f4f6;
        }
      `}</style>

      <div className="card">
        {/* Top right buttons */}
        <div className="top-bar">
          <Link to="/login" className="top-btn">Login</Link>
          <Link to="/signup" className="top-btn">Sign up</Link>
        </div>

        <h1>Todo List</h1>
        <p>
          A simple, fast, and distraction-free way to manage your tasks and
          stay productive every day.
        </p>

        <div className="features">
          <div className="feature">
            <span>✅</span>
            <div>Organize tasks</div>
          </div>
          <div className="feature">
            <span>⚡</span>
            <div>Fast workflow</div>
          </div>
          <div className="feature">
            <span>🧠</span>
            <div>Stay focused</div>
          </div>
        </div>

        <div className="cta">
          <Link to="/login" className="start-btn">
            Start using app
          </Link>
          <Link to="/signup" className="secondary-btn">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
