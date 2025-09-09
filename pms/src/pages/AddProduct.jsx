import React, { useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
const API_URL = "https://pms-nxtify.onrender.com/api/products"; 
function AddProduct() {

  const addProduct = async (product) => {
    try {
      await axios.post(`${API_URL}`, product);
      alert("Product Added Successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-product-page">
      <h2 className="main-title">Add New Product</h2>
      <div className="form-wrapper">
        <ProductForm onAdd={addProduct} />
      </div>
    </div>
  );

  
}

export default AddProduct;
