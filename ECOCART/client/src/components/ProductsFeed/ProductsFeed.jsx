import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductsFeed.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export const ProductsFeed = ({ searchTerm }) => {
	const [products, setProducts] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const { cart , addToCart } = useCart();

	useEffect(() => {
		axios.get("http://localhost:5000/api/products")
			.then((res) => setProducts(res.data))
			.catch((err) => console.error("Error fetching products:", err));
	}, []);

	const toggleWishlist = (id) => {
		setWishlist((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	// 🔍 Filter products based on searchTerm
	const filteredProducts = products.filter((product) =>
		product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="product-feed container my-5">
			<h2 className="text-success mb-4 fw-bold">Top Eco-Friendly Picks</h2>
			<div className="row g-4">
				{filteredProducts.length > 0 ? (
					filteredProducts.map((product) => (
						<div key={product.product_id} className="col-6 col-md-4 col-lg-3 mb-4">

							<div className="card product-card h-100">
								<Link to={`/product/${product.product_id}`} className="text-decoration-none text-dark">
									<img
										src={product.image || "/assets/download.png"}
										className="card-img-top product-img"
										alt={product.product_name}
									/>
								</Link>
								<div className="card-body">
									<Link to={`/product/${product.product_id}`} className="text-decoration-none text-dark">
										<h5 className="card-title fw-semibold">{product.product_name}</h5>

										<p className="card-text text-success fw-bold">
											₹{product.price}
										</p>
										<p className="card-text eco-score">
											♻️ Eco Score: {product.eco_score}
										</p>
									</Link>
									<div className="d-flex justify-content-between align-items-center mt-3">
										{cart.some(item => item.product_id === product.product_id) ? (
											<button className="btn btn-outline-success btn-sm" disabled>
												🛒 Added
											</button>
										) : (
											<button
												className="btn btn-outline-success btn-sm"
												onClick={() => addToCart(product)}
											>
												🛒 Add to Cart
											</button>
										)}

										<button
											className={`wishlist-btn ${wishlist.includes(product.product_id) ? "active" : ""}`}
											onClick={() => toggleWishlist(product.product_id)}
											title="Add to Wishlist"
										>
											❤️
										</button>
									</div>
								</div>
							</div>

						</div>
					))
				) : (
					<p className="text-center text-muted">No products found.</p>
				)}
			</div>
		</div>
	);
};
