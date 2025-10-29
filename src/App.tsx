import { Outlet, Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 20, textDecoration: "none" }}>
          Receptsajt
        </Link>
        <nav style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <Link to="/">Alla recept</Link>
          <Link to="/nytt">+ Nytt</Link>
          {/* <Link to="/test">API-test</Link> */}
        </nav>
      </header>
      <main style={{ marginTop: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
