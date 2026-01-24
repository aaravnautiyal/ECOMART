// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalWeightedEcoScore = cart.reduce(
    (sum, item) => sum + item.eco_score * item.price * item.quantity,
    0
  );

  const totalWeight = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const weightedAvgEcoScore = totalWeight === 0 ? 0 : (totalWeightedEcoScore / totalWeight).toFixed(2);

  return (
    <div className="container cart-container">
      <h2 className="cart-heading">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-muted">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-outline-success mt-3">
            Go Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="row">
            {cart.map((item) => (
              <div
                key={item.product_id}
                className="col-12 cart-item d-flex justify-content-between align-items-center"
              >
                <Link to={`/product/${item.product_id}`}>
                  <img
                    src={item.image || "/assets/download.png"}
                    alt={item.product_name || item.name}
                  />
                </Link>
                <div className="cart-item-info">
                  <h5 className="fw-semibold mb-1">{item.product_name || item.name}</h5>
                  <p className="text-success fw-bold mb-1">₹{item.price}</p>
                  <p className="text-success fw-bold mb-1">EcoScore: {item.eco_score}</p>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => updateQuantity(item.product_id, -1)}
                    >
                      −
                    </button>
                    <span className="fw-bold">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() => updateQuantity(item.product_id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-side text-end">
                  <p className="fw-bold mb-2">₹{item.price * item.quantity}</p>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total mt-4">
            <h4>
              Total: <span className="text-success">₹{total.toFixed(2)}</span>
            </h4>
            <h5 className="text-muted">
              ♻️ Overall EcoScore: <span className="text-success">{weightedAvgEcoScore}</span>
            </h5>
            <button className="btn btn-outline-danger me-2 mt-3" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn btn-success mt-3">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
