import React from "react";

function ProductCard({ product, onDelete, onView, onEdit }) {
  const cat = (product.category || "").toLowerCase();
  const chipClass = `chip ${cat === "electronics" ? "chip-electronics" :
    cat === "fashion" ? "chip-fashion" :
      cat === "home" ? "chip-home" :
        cat === "grocery" ? "chip-grocery" :
          "chip-others"
    }`;

  return (
    <div className="product-card" onClick={() => onView(product)} style={{ cursor: "pointer" }}>
      <div className="product-body">
        <div className="product-card-header">
          <h3 className="product-card-title">{product.name}</h3>
          {product.category && <span className={chipClass}>{product.category}</span>}
        </div>
        <p className="product-card-description">{product.description}</p>
        <div className="product-meta">
          <div className="product-price">₹{product.price}</div>
        </div>
        <div className="product-actions" style={{ justifyContent: 'center', display: 'flex', gap: 12 }} onClick={(e) => e.stopPropagation()}>
          <button className="button button-delete" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 700, fontSize: '1rem', padding: '12px 0' }} onClick={() => onDelete(product._id)}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="#8D6748" strokeWidth="2.2" strokeLinecap="round" /></svg> Delete
          </button>
          <button className="button button-edit" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 700, fontSize: '1rem', padding: '12px 0' }} onClick={() => onEdit(product)}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 17.25V21h3.75l11.06-11.06-3.75-3.75L4 17.25z" stroke="#8D6748" strokeWidth="2.2" /></svg> Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
