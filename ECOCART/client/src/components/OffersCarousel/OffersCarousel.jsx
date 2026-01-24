import React from "react";
import "./OffersCarousel.css";

export const OffersCarousel = () => {
	return (
		<div
			id="ecoOffersCarousel"
			className="carousel slide my-4"
			data-bs-ride="carousel"
		>
			<div className="carousel-inner rounded-4 shadow-sm">
				<div className="carousel-item active">
					<div className="offer-slide bg-offer-1 text-white p-5 d-flex flex-column justify-content-center align-items-start">
						<h2>🌿 Flat 30% Off on All Reusable Products</h2>
						<p>This Week Only — Bamboo, Metal, and Glass Essentials.</p>
					</div>
				</div>
				<div className="carousel-item">
					<div className="offer-slide bg-offer-2 text-white p-5 d-flex flex-column justify-content-center align-items-start">
						<h2>🛍 Buy 2 Get 1 Free – Eco Clothing Sale</h2>
						<p>On Organic Cotton T-Shirts, Towels, and More.</p>
					</div>
				</div>
				<div className="carousel-item">
					<div className="offer-slide bg-offer-3 text-white p-5 d-flex flex-column justify-content-center align-items-start">
						<h2>🍽 Up to 50% Off – Sustainable Kitchenware</h2>
						<p>Biodegradable Plates, Reusable Cups, and Eco Tools.</p>
					</div>
				</div>
			</div>
		</div>
	);
};
