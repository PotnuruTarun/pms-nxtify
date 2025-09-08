import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, handleDeleteProduct }) => {
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} />
      ))}
    </div>
  );
};

export default ProductList;
