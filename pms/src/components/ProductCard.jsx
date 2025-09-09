import React from "react";

function ProductCard({ product, onDelete, onView, onEdit }) {
  return (
    <div className="product-card" onClick={() => onView(product)} style={{ cursor: "pointer" }}>
      <div className="product-body">
        <div className="product-card-header">
          <h3 className="product-card-title">{product.name}</h3>
          {product.category && <span className="chip">{product.category}</span>}
        </div>
        <p className="product-card-description">{product.description}</p>
        <div className="product-meta">
          <div className="product-price">₹{product.price}</div>
        </div>
        <div className="product-actions" onClick={(e) => e.stopPropagation()}>
          <button className="button button-danger" onClick={() => onDelete(product._id)}>Delete</button>
          <button className="button button-primary" onClick={() => onEdit(product)}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
