// fuzzifier.js

function triangular(x, a, b, c) {
  if (x <= a || x >= c) return 0;
  else if (x === b) return 1;
  else if (x < b) return (x - a) / (b - a);
  else return (c - x) / (c - b);
}

function fuzzifyElectronics(data) {
  const result = {};

  const recycled = parseFloat(data.recycled_pct) || 0;
  const carbon = parseFloat(data.carbon_footprint) || 0;
  const energy = parseFloat(data.energy_efficiency) || 0;
  const certCount = data.certifications ? data.certifications.length : 0;

  result.recycled_low = triangular(recycled, 0, 0, 30);
  result.recycled_med = triangular(recycled, 20, 50, 80);
  result.recycled_high = triangular(recycled, 70, 100, 100);

  result.carbon_low = triangular(carbon, 0, 0, 1.5);
  result.carbon_med = triangular(carbon, 1.0, 2.5, 4.0);
  result.carbon_high = triangular(carbon, 3.5, 5.5, 7.0);

  result.energy_low = triangular(energy, 1, 1, 2.5);
  result.energy_med = triangular(energy, 2, 3, 4);
  result.energy_high = triangular(energy, 3.5, 5, 5);

  // ✅ NEW: Fuzzify cert_count
  result.cert_low = triangular(certCount, 0, 0, 1);
  result.cert_med = triangular(certCount, 0.5, 1.5, 2.5);
  result.cert_high = triangular(certCount, 2, 3, 3);


  result.battery_included = parseInt(data.battery_included) || 0;
  result.company_practices = parseInt(data.company_practices) || 0;

  return result;
}

function fuzzify(data) {
  if (!data.category) throw new Error("Category is required");

  switch (data.category) {
    case "electronics":
      return fuzzifyElectronics(data);
    // Add other categories here when ready
    default:
      throw new Error(`Fuzzification not implemented for category: ${data.category}`);
  }
}

module.exports = { fuzzify };
