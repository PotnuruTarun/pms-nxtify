import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

const API_URL = "https://pms-nxtify.onrender.com/api/products";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); 
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.status === 200) {
        setProducts(products.filter((p) => p._id !== id));
        alert("Product deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleUpdate = async (updated) => {
    try {
      await axios.put(`${API_URL}/${updated._id}`, updated);
      alert(" Product updated!");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(" Failed to update product");
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "priceltoh") return a.price - b.price;
    if (sortBy === "pricehtol") return b.price - a.price;
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div>
      <div
        className="search-container"
        style={{ display: "flex", gap: "12px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          style={{ flex: 1 }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="search-input"
          style={{ maxWidth: "200px" }}
        >
          <option value="">Sort By</option>
          <option value="name"> Name</option>
          <option value="category">Category</option>
          <option value="priceltoh"> Price(Low to High)</option>
          <option value="pricehtol"> Price(High to Low)</option>
        </select>
      </div>

      <div className="product-grid">
        {sorted.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onDelete={handleDelete}
            onView={() => setSelectedProduct(p)}
            onEdit={() => setEditingProduct(p)}
          />
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: "100%" }}>
            <h2>Name: {selectedProduct.name}</h2>
            <p><b>Description:</b> {selectedProduct.description}</p>
            <p><b>Category:</b> {selectedProduct.category}</p>
            <h3 style={{ color: "#3b82f6" }}>Price:   ₹{selectedProduct.price}</h3>
            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}

      {editingProduct && (
  <div 
    className="modal-overlay" 
    onClick={() => setEditingProduct(null)} 
  >
    <div 
      className="" 
      onClick={(e) => e.stopPropagation()} 
      style={{ maxWidth: "100%" }}
    >
      <h2>Edit Product</h2>
      <ProductForm
        onUpdate={handleUpdate}
        initialData={editingProduct} 
      />
    </div>
  </div>
)}

    </div>
  );
}

export default Home;
