import React from "react";

function ProductCard({ product, onDelete, onView, onEdit }) {
  return (
    <div
      className="product-card"
      onClick={() => onView(product)}
      style={{ cursor: "pointer" }}
    >
      <h3 className="product-card-title">
        {product.name}
      </h3>
      <p className="product-card-description">{product.description}</p>
      <small>{product.category}</small>
       <div className="product-price">₹{product.price}</div>
      <div
        className="product-card-footer"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="button-delete" onClick={() => onDelete(product._id)}>
          Delete
        </button>
        <button
          className="button-submit"
          style={{ marginLeft: "8px" }}
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
