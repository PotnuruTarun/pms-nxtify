import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import ViewProducts from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState("light");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  return (
    <Router>
      <div className="app-root">
        <header className={`navbar ${navOpen ? 'open' : ''}`}>
          <div className="navbar-left">
            <NavLink to="/" className="brand" end>
              <span className="brand-badge">P</span>MS
            </NavLink>

          </div>
          {/* Removed searchbar and category dropdown from navbar-center */}
          <div className="navbar-right">
            <button
              className="button theme-toggle mobile-only"
              aria-label="Toggle theme"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            >
              {theme === "dark" ? "🌙" : "🌞"}
              <span className="label" style={{ marginLeft: 8 }}>{theme === "dark" ? "Dark" : "Light"}</span>
            </button>
            <button
              className="button menu-button"
              aria-label="Toggle navigation"
              onClick={() => setNavOpen((v) => !v)}
            >
              ☰
            </button>
            {/* Desktop nav */}
            <nav className={`nav-links desktop-only`} style={{ marginLeft: 'auto', marginRight: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
              <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>View Products</NavLink>
              <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>Add Product</NavLink>
            </nav>
            <button
              className="button theme-toggle desktop-only"
              aria-label="Toggle theme"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            >
              {theme === "dark" ? "🌙" : "🌞"}
              <span className="label" style={{ marginLeft: 8 }}>{theme === "dark" ? "Dark" : "Light"}</span>
            </button>
            {/* Mobile nav overlay */}
            {navOpen && (
              <div className="mobile-nav-overlay" onClick={() => setNavOpen(false)}>
                <nav className="mobile-nav" onClick={e => e.stopPropagation()}>
                  <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setNavOpen(false)}
                  >Home</NavLink>
                  <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setNavOpen(false)}
                  >View Products</NavLink>
                  <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setNavOpen(false)}
                  >Add Product</NavLink>
                </nav>
              </div>
            )}
          </div>
        </header>
        <main className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/products"
              element={
                <ViewProducts
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                />
              }
            />
            <Route path="/add" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
