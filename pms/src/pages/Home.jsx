import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

const API_URL = "https://pms-nxtify.onrender.com/api/products";

function Home({ searchQuery = "", selectedCategory = "" }) {
  const [products, setProducts] = useState([]);
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

  const filtered = products.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory ? (p.category || "").toLowerCase() === selectedCategory.toLowerCase() : true;
    return nameMatch && categoryMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "priceltoh") return a.price - b.price;
    if (sortBy === "pricehtol") return b.price - a.price;
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
        <h2 className="main-title" style={{ margin: 0, flex: 1 }}>Products</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="category-select"
          style={{ maxWidth: "220px" }}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="priceltoh">Price (Low to High)</option>
          <option value="pricehtol">Price (High to Low)</option>
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
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>{selectedProduct.name}</h2>
            <p><b>Category:</b> {selectedProduct.category || "-"}</p>
            <p style={{ color: "var(--muted)" }}><b>Description:</b> {selectedProduct.description}</p>
            <h3 style={{ color: "var(--accent)" }}>Price: ₹{selectedProduct.price}</h3>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
              <button className="modal-button" onClick={() => setSelectedProduct(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Edit Product</h2>
            <ProductForm onUpdate={handleUpdate} initialData={editingProduct} />
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
