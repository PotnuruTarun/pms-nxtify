import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <aside className="sidebar">
          <h2 className="sidebar-title">
            <span className="sidebar-title-highlight">P</span>MS
          </h2>
          <nav className="sidebar-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Add Product
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
