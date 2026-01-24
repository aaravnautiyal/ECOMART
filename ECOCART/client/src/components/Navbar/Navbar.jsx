// src/components/Navbar/Navbar.jsx
import React, { useState, useContext, useRef, useEffect } from "react";
import "./Navbar.css";
import { FaUser, FaHeart, FaShoppingCart, FaLeaf } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Navbar = ({ setSearchTerm }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleDropdown = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUserClick = () => {
    navigate(token ? "/dashboard" : "/login");
  };

  // Close dropdown when clicking outside
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="eco-navbar">
      <div className="nav-left">
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            ☰ Menu
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <Link to="/productForm">♻ Add product as {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}an Seller</Link>
              <Link to="#">🌱 Awareness</Link>
              <Link to="#">🍱 Food Donation</Link>
              <Link to="#">♻ Return Waste</Link>
            </div>
          )}
        </div>
      </div>

      <div className="nav-center">
        <FaLeaf className="leaf-icon" />
        <Link className="brand-text" to="/">EcoMart</Link>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search eco-friendly products..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="nav-right">
        <a onClick={handleUserClick} title="User" className="icon-btn">
          <FaUser />
        </a>
        {/* <Link to="/productForm">Product</Link> */}
        {token && (
          <a href="#" title="Wishlist" className="icon-btn">
            <FaHeart />
          </a>
        )}

        <Link to="/cart" title="Cart" className="icon-btn">
          <FaShoppingCart />
          {/* {totalItems > 0 && <span className="badge">{totalItems}</span>} */}
        </Link>

        {token && (
          <div className="score-box">
            <p>Eco Score</p>
            <div className="score-value">78</div>
            <small>Rank: 🌍 Conscious</small>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;