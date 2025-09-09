import React, { useState, useEffect } from "react";

function ProductForm({ onAdd, onUpdate, initialData, onClose }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        price: initialData.price || "",
        description: initialData.description || "",
        category: initialData.category || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("⚠️ Name and Price are required!");
      return;
    }

    if (initialData) {
      onUpdate({ ...initialData, ...form, price: Number(form.price) });
    } else {
      onAdd({ ...form, price: Number(form.price) });
    }

    setForm({ name: "", price: "", description: "", category: "" });
    if (onClose) onClose();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Price</label>
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: initialData ? "1fr 1fr" : "1fr", gap: "12px", marginTop: "8px" }}>
        {initialData && (
          <button type="button" className="button" onClick={onClose}>Cancel</button>
        )}
      <button type="submit" className="button button-primary">
        {initialData ? "Update Product" : "Add Product"}
      </button>
      </div>
    </form>
  );
}

export default ProductForm;
