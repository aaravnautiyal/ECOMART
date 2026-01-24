// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";
import { useCart } from "../context/CartContext";

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`/api/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p className="text-center mt-5">Loading product...</p>;

  return (
    <div className="container product-page my-5">
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={product.image || "/assets/download.png"}
            alt={product.product_name}
            className="product-image img-fluid rounded"
          />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.product_name}</h2>

          <p className="text-success h5 fw-semibold">₹{product.price}</p>

          <span className="badge bg-success mb-3">
            ♻️ Eco Score: {product.eco_score}
          </span>

          <p className="text-muted">
            {product.description || "No description available for this product."}
          </p>

          <button
            className="btn btn-success btn-lg mt-3"
            onClick={() => addToCart(product)}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
