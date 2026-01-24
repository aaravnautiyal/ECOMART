import React from "react";
import "./Hero.css";

const Hero = () => {
	return (
		<section className="hero-section">
			<div className="hero-bg-overlay"></div>

			<div className="hero-content container text-center text-white">
				<h1 className="hero-title">
					Enter <span className="eco-highlight">Eco Mode</span>
				</h1>
				<p className="hero-subtitle">
					Shop consciously. Earn rewards. Make an impact.
				</p>
				<div className="hero-buttons">
					<button className="btn btn-success btn-lg px-4 py-2 me-3">
						🌿 Start Exploring
					</button>
					<button className="btn btn-outline-light btn-lg px-4 py-2">
						💡 Learn More
					</button>
				</div>

				<div className="scroll-down-icon">
					<span></span>
				</div>
			</div>
		</section>
	);
};

export default Hero;
