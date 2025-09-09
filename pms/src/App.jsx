import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  

  return (
    <Router>
      <div className="app-root">
        <header className="navbar">
          <div className="navbar-left">
            <NavLink to="/" className="brand" end>
              <span className="brand-badge">P</span>MS
            </NavLink>
            <nav className="nav-links">
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
              <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>Add Product</NavLink>
            </nav>
          </div>
          <div className="navbar-center">
            <div className="searchbar">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="searchbar-input"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Grocery">Grocery</option>
            </select>
          </div>
          <div className="navbar-right">
            <button
              className="button"
              aria-label="Toggle theme"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            >
              {theme === "dark" ?  "🌙 Dark" : "🌞 Light" }
            </button>
          </div>
        </header>
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
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
