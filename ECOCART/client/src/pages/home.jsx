import Hero from "../components/Hero/Hero.jsx";
import React, { useState, useRef, useEffect } from "react";
import { Categories } from "../components/Categories/Categories.jsx";
import { OffersCarousel } from "../components/OffersCarousel/OffersCarousel.jsx";
import { ProductsFeed } from "../components/ProductsFeed/ProductsFeed.jsx";
import { SuggestionsPanel } from "../components/SuggestionsPanel/SuggestionsPanel.jsx";
import { Footer } from "../components/Footer/Footer.jsx";
import "../App.css";

function Home({ searchTerm }) {
	const productFeedRef = useRef(null);
	useEffect(() => {
		if (searchTerm.trim() !== "" && productFeedRef.current) {
			productFeedRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [searchTerm]);
	return (
		<div className="eco-home">

			<Hero />

			<div className="eco-main-section container-fluid px-4 mt-5">
				<div className="row">
					<div className="col-lg-2 d-none d-lg-block">
						<Categories />
					</div>

					<div className="col-lg-7" ref={productFeedRef}>
						<OffersCarousel />
						<ProductsFeed searchTerm={searchTerm} />
					</div>

					<div className="col-lg-3">
						<SuggestionsPanel />
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Home;
