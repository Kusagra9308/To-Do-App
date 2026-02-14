import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #ffffff;
        }

        /* NAVBAR */
        .nav {
          height: 72px;
          padding: 0 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f1f1f1;
        }

        .logo {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ef4444;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-link {
          text-decoration: none;
          color: #374151;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav-cta {
          padding: 10px 18px;
          border-radius: 12px;
          background: #ef4444;
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
        }

        /* HERO */
        .hero {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 48px;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .hero-left h1 {
          font-size: 3.4rem;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #111827;
          margin-bottom: 20px;
        }

        .hero-left p {
          font-size: 1.15rem;
          color: #6b7280;
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 28px;
        }

        .reviews {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: #374151;
          margin-bottom: 32px;
        }

        .stars {
          color: #f59e0b;
          letter-spacing: 2px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .primary-btn {
          padding: 16px 32px;
          border-radius: 16px;
          background: #ef4444;
          color: white;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
        }

        .secondary-btn {
          padding: 16px 32px;
          border-radius: 16px;
          background: #ffffff;
          color: #374151;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          border: 1px solid #e5e7eb;
        }

        /* MOCK APP PREVIEW */
        .hero-right {
          background: linear-gradient(180deg, #fff5eb, #fde9dc);
          border-radius: 28px;
          padding: 28px;
          box-shadow:
            0 40px 80px rgba(0,0,0,0.08),
            0 10px 24px rgba(0,0,0,0.05);
        }

        .app-mock {
          display: flex;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          min-height: 420px;
        }

        .mock-sidebar {
          width: 38%;
          background: #f9fafb;
          padding: 16px;
          border-right: 1px solid #e5e7eb;
        }

        .mock-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .mock-item {
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 0.9rem;
          color: #374151;
          margin-bottom: 6px;
        }

        .mock-item.active {
          background: #fee2e2;
          color: #b91c1c;
          font-weight: 500;
        }

        .mock-content {
          flex: 1;
          padding: 20px;
        }

        .mock-header {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #111827;
        }

        .task {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          font-size: 0.95rem;
          color: #374151;
        }

        .task input {
          accent-color: #ef4444;
        }

        .task .done {
          text-decoration: line-through;
          color: #9ca3af;
        }

        /* MOBILE */
        @media (max-width: 900px) {
          .nav {
            padding: 0 20px;
          }

          .hero {
            grid-template-columns: 1fr;
            padding: 48px 20px;
            text-align: center;
          }

          .hero-left h1 {
            font-size: 2.4rem;
          }

          .hero-left p {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="nav">
        <div className="logo">todoist</div>
        <div className="nav-right">
          <Link to="/login" className="nav-link">Log in</Link>
          <Link to="/signup" className="nav-cta">Start for free</Link>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <h1>Clarity, finally.</h1>

          <p>
            Join millions of people who simplify work and life with a fast,
            focused, and beautifully simple to-do list.
          </p>

          <div className="reviews">
            <span className="stars">★★★★★</span>
            <span>374k+ reviews</span>
          </div>

          <div className="hero-actions">
            <Link to="/signup" className="primary-btn">Start for free</Link>
            <Link to="/login" className="secondary-btn">Log in</Link>
          </div>
        </div>

        {/* APP MOCK */}
        <div className="hero-right">
          <div className="app-mock">
            <div className="mock-sidebar">
              <div className="mock-title">My Projects</div>
              <div className="mock-item active">Today</div>
              <div className="mock-item">Upcoming</div>
              <div className="mock-item">Personal</div>
              <div className="mock-item">Work</div>
            </div>

            <div className="mock-content">
              <div className="mock-header">Today</div>

              <div className="task">
                <input type="checkbox" />
                <span>Finish UI design</span>
              </div>
              <div className="task">
                <input type="checkbox" defaultChecked />
                <span className="done">Review pull requests</span>
              </div>
              <div className="task">
                <input type="checkbox" />
                <span>Plan next sprint</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
