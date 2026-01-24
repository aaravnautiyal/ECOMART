import React, { useEffect, useRef, useState } from "react";

function ScoreCircle({ score, maxScore }) {
	const circleRef = useRef(null);
	const [displayScore, setDisplayScore] = useState(0);
	const radius = 70;
	const circumference = 2 * Math.PI * radius;
	const percent = Math.min((score / maxScore) * 100, 100);

	useEffect(() => {
		const circle = circleRef.current;
		circle.style.strokeDasharray = circumference;
		circle.style.strokeDashoffset = circumference;

		const offset = circumference - (percent / 100) * circumference;
		setTimeout(() => {
			circle.style.strokeDashoffset = offset;
		}, 100);

		let current = 0;
		const increment = Math.ceil(score / 60);
		const animate = () => {
			current += increment;
			if (current > score) current = score;
			setDisplayScore(current);
			if (current < score) requestAnimationFrame(animate);
		};
		animate();
	}, [score, maxScore]);

	return (
		<div className="card p-4 mb-4 text-center shadow-sm">
			<div
				className="score-circle mx-auto"
				aria-label="User eco score progress"
			>
				<svg width="180" height="180">
					<circle className="score-bg" cx="90" cy="90" r={radius}></circle>
					<circle
						className="score-progress"
						ref={circleRef}
						cx="90"
						cy="90"
						r={radius}
						style={{
							transition: "stroke-dashoffset 1.2s ease-out",
							strokeDasharray: circumference,
							strokeDashoffset: circumference,
						}}
					></circle>
				</svg>
				<div className="score-number" id="ecoScoreNumber">
					{displayScore}
				</div>
			</div>
			<div className="score-label mt-3">Total Eco Score</div>
		</div>
	);
}

export default ScoreCircle;
