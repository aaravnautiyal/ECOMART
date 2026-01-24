import React from "react";

const badges = [
	{ icon: "🍲", name: "Food Donor", desc: "Donated food to local communities" },
	{
		icon: "♻️",
		name: "Recycle Champion",
		desc: "Returned recyclable materials",
	},
	{ icon: "📚", name: "Eco Scholar", desc: "Completed eco-awareness programs" },
	{ icon: "🛍️", name: "Eco Tote Master", desc: "Used reusable bags 50+ times" },
	{ icon: "💧", name: "Hydro Hero", desc: "Reduced water usage by 20%" },
	{ icon: "🌳", name: "Forest Guardian", desc: "Planted 10+ trees" },
];

function Badges() {
	return (
		<div className="card p-4 shadow-sm">
			<h4 className="mb-3">🏅 Badges Earned</h4>
			<div className="badges-grid">
				{badges.map((badge, idx) => (
					<div className="badge-card" key={idx} title={badge.desc} tabIndex="0">
						<div className="badge-icon">{badge.icon}</div>
						<div className="badge-name">{badge.name}</div>
						<div className="badge-desc">{badge.desc}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Badges;
