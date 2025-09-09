
// View Products page (was Home)
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { NavLink } from "react-router-dom";

const API_URL = "https://pms-nxtify.onrender.com/api/products";


function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.status === 200) {
        setProducts(products.filter((p) => p._id !== id));
        alert("Product deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    } finally {
      setConfirmDeleteId(null);
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
    const productCat = (p.category || "").toLowerCase();
    let categoryMatch = true;
    if (selectedCategory) {
      if (selectedCategory.toLowerCase() === "others") {
        const core = ["electronics", "fashion", "home", "grocery"];
        categoryMatch = !core.includes(productCat);
      } else {
        categoryMatch = productCat === selectedCategory.toLowerCase();
      }
    }
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <h2 className="main-title" style={{ margin: 0, flex: 1, minWidth: 120 }}>Products</h2>
        <div className="filters-container">
          <div className="searchbar" style={{ minWidth: 140, maxWidth: 200, flex: '0 1 200px' }}>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="searchbar-input"
              style={{ width: '100%', minWidth: 100, maxWidth: 200, fontSize: '1rem', padding: '10px 12px' }}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
            style={{ minWidth: 100, maxWidth: 140 }}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Grocery">Grocery</option>
            <option value="Others">Others</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="category-select sort-select"
            style={{ minWidth: 100, maxWidth: 140 }}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="priceltoh">Price (Low to High)</option>
            <option value="pricehtol">Price (High to Low)</option>
          </select>
        </div>
      </div>


      <div
        style={{


        }} className="filters-wrapper"
      >
        {/* Search Bar - Full width */}
        <div style={{ width: "100%", marginBottom: 12 }}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="searchbar-input"
            style={{
              width: "100%",
              fontSize: "1rem",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Dropdowns - Side by side */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
            style={{
              flex: 1,
              minWidth: "120px",
              padding: "10px 12px",
              borderRadius: "8px",
            }}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Grocery">Grocery</option>
            <option value="Others">Others</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="category-select sort-select"
            style={{
              flex: 1,
              minWidth: "120px",
              padding: "10px 12px",
              borderRadius: "8px",
            }}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="priceltoh">Price (Low to High)</option>
            <option value="pricehtol">Price (High to Low)</option>
          </select>
        </div>
      </div>


























      {loading ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.7)',
          zIndex: 1000
        }}>
          <div className="spinner" style={{ width: 48, height: 48, border: '5px solid #eee', borderTop: '5px solid #8D6748', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : (
        sorted.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40vh',
            gap: 20,
            background: 'var(--surface, #f9f6f2)',
            borderRadius: 16,
            boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
            margin: '32px auto',
            maxWidth: 480,
            padding: '48px 24px',
          }}>
            <div style={{ fontSize: 56, marginBottom: 0, lineHeight: 1 }} role="img" aria-label="Sad face">😔</div>
            <h2 style={{ color: 'var(--text, #8D6748)', margin: 0, fontWeight: 700, fontSize: 24 }}>No products present</h2>
            <p style={{ color: 'var(--muted, #a89b8c)', fontSize: 16, margin: 0, textAlign: 'center' }}>
              There are currently no products in the database.<br />
              Click below to add your first product!
            </p>
            <NavLink to="/add"
              className="button"
              style={{
                background: 'linear-gradient(90deg, #8D6748 0%, #BFA181 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 18,
                border: 'none',
                borderRadius: 8,
                padding: '12px 32px',
                marginTop: 12,
                cursor: 'pointer',
                boxShadow: '0 2px 8px 0 rgba(141,103,72,0.08)'
              }}

            >
              Add Product
            </NavLink>
          </div>
        ) : (
          <div className="product-grid">
            {sorted.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onDelete={() => setConfirmDeleteId(p._id)}
                onView={() => setSelectedProduct(p)}
                onEdit={() => setEditingProduct(p)}
              />
            ))}
          </div>
        )
      )}

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>{selectedProduct.name}</h2>
            <p><b>Category:</b> {selectedProduct.category ? (
              <span className={`chip ${(selectedProduct.category || '').toLowerCase() === 'electronics' ? 'chip-electronics' : (selectedProduct.category || '').toLowerCase() === 'fashion' ? 'chip-fashion' : (selectedProduct.category || '').toLowerCase() === 'home' ? 'chip-home' : (selectedProduct.category || '').toLowerCase() === 'grocery' ? 'chip-grocery' : 'chip-others'}`}>
                {selectedProduct.category}
              </span>
            ) : '-'}
            </p>
            <p style={{ color: "var(--muted)" }}><b>Description:</b> {selectedProduct.description}</p>
            <h3
              style={{
                color: '#22c55e',
                textShadow: '0 1px 6px rgba(0,0,0,0.10)'
              }}
            >
              Price: ₹{Number(selectedProduct.price).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
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
            <ProductForm onUpdate={handleUpdate} initialData={editingProduct} onClose={() => setEditingProduct(null)} />
          </div>
        </div>
      )}

      {mobileFilterOpen && (
        <div className="modal-overlay" onClick={() => setMobileFilterOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Sort Products</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="category-select"
              style={{ width: "100%" }}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="priceltoh">Price (Low to High)</option>
              <option value="pricehtol">Price (High to Low)</option>
            </select>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <button className="button" onClick={() => setMobileFilterOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="modal-overlay" onClick={() => setConfirmDeleteId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Delete this product?</h3>
            <p style={{ color: "var(--muted)" }}>This action cannot be undone.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
              <button className="button" onClick={() => setConfirmDeleteId(null)}>Cancel</button>
              <button className="button button-danger" onClick={() => handleDelete(confirmDeleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ViewProducts;
