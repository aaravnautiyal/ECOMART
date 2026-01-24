export const categoryExtraFields = {
  electronics: [
    { name: "recycled_pct", label: "Recycled Content (%)", type: "number", min: 0, max: 100 },
    { name: "carbon_footprint", label: "Carbon Footprint (kg CO₂)", type: "number", min: 0, step: 0.01 },
    { name: "energy_efficiency", label: "Energy Efficiency (1–5)", type: "number", min: 1, max: 5, step: 0.1 },
    { name: "battery_included", label: "Battery Included", type: "select", options: ["1", "0"] },
    { name: "company_practices", label: "Good Company Practices", type: "select", options: ["1", "0"] }
  ],

  clothing: [
    { name: "organic_material_pct", label: "Organic Material (%)", type: "number", min: 0, max: 100 },
    { name: "dye_type", label: "Type of Dye Used", type: "text" },
    { name: "chemical_free", label: "Chemical-Free Certified", type: "select", options: ["1", "0"] }
  ],

  food: [
    { name: "organic_certified", label: "Organic Certified", type: "select", options: ["1", "0"] },
    { name: "packaging_recyclable", label: "Recyclable Packaging", type: "select", options: ["1", "0"] },
    { name: "preservative_free", label: "Preservative-Free", type: "select", options: ["1", "0"] }
  ],

  cosmetics: [
    { name: "vegan_friendly", label: "Vegan Friendly", type: "select", options: ["1", "0"] },
    { name: "cruelty_free", label: "Cruelty-Free", type: "select", options: ["1", "0"] },
    { name: "microplastic_free", label: "Microplastic-Free", type: "select", options: ["1", "0"] }
  ],

  furniture: [
    { name: "wood_type", label: "Type of Wood", type: "text" },
    { name: "reclaimed_wood", label: "Reclaimed Wood Used", type: "select", options: ["1", "0"] },
    { name: "formaldehyde_free", label: "Formaldehyde-Free", type: "select", options: ["1", "0"] }
  ],

  toys: [
    { name: "material_safety_cert", label: "Material Safety Certified", type: "select", options: ["1", "0"] },
    { name: "non_toxic_paint", label: "Non-Toxic Paint", type: "select", options: ["1", "0"] },
    { name: "recyclable_packaging", label: "Recyclable Packaging", type: "select", options: ["1", "0"] }
  ],

  cleaning: [
    { name: "biodegradable", label: "Biodegradable Ingredients", type: "select", options: ["1", "0"] },
    { name: "non_toxic", label: "Non-Toxic Formula", type: "select", options: ["1", "0"] },
    { name: "refill_available", label: "Refill Packaging Available", type: "select", options: ["1", "0"] }
  ],

  paper: [
    { name: "recycled_content", label: "Recycled Content (%)", type: "number", min: 0, max: 100 },
    { name: "chlorine_free", label: "Chlorine-Free Bleaching", type: "select", options: ["1", "0"] },
    { name: "compostable", label: "Compostable", type: "select", options: ["1", "0"] }
  ],

  packaging: [
    { name: "compostable_material", label: "Compostable Material", type: "select", options: ["1", "0"] },
    { name: "plastic_free", label: "Plastic-Free", type: "select", options: ["1", "0"] },
    { name: "multi_use", label: "Reusable Packaging", type: "select", options: ["1", "0"] }
  ],

  appliances: [
    { name: "energy_star_rating", label: "Energy Star Rating (1–5)", type: "number", min: 1, max: 5, step: 0.1 },
    { name: "noise_level", label: "Noise Level (dB)", type: "number", min: 0 },
    { name: "water_saving", label: "Water Saving Certified", type: "select", options: ["1", "0"] }
  ]
};
