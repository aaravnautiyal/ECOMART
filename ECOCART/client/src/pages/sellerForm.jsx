import React, { useState } from "react";
import { categoryCertifications } from "./categoryCerts";
import { categoryExtraFields } from "./categoryExtraFields";
import "./ProductForm.css"; // ✅ new CSS import

const ProductForm = () => {
    const commonFields = {
        product_name: "",
        description: "",
        price: "",
        category: "",
        certifications: [],
        seller_id: 1
    };

    const [form, setForm] = useState(commonFields);
    const [ecoScore, setEcoScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "category") {
            const extras = categoryExtraFields[value] || [];

            // Don't reset the whole form, just add any missing extra fields
            setForm((prevForm) => {
                const updatedForm = {
                    ...prevForm,
                    category: value,
                    certifications: []
                };

                extras.forEach((field) => {
                    if (!(field.name in updatedForm)) {
                        updatedForm[field.name] = "";
                    }
                });

                return updatedForm;
            });
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };


    const handleCertChange = (e) => {
        const { value, checked } = e.target;
        let newCerts = [...form.certifications];
        if (checked) {
            newCerts.push(value);
        } else {
            newCerts = newCerts.filter((cert) => cert !== value);
        }
        setForm({ ...form, certifications: newCerts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setEcoScore(null);

        try {
            const res = await fetch("http://localhost:5000/api/products/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            if (data.product && data.product.eco_score !== undefined) {
                setEcoScore(data.product.eco_score);
            } else {
                setError("Eco-score not returned in the expected format.");
            }
        } catch (err) {
            console.error("Error:", err);
            setError(err.message || "Submission failed.");
        } finally {
            setLoading(false);
        }
    };

    const certOptions = categoryCertifications[form.category] || [];

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Add New Product</h2>

            <div className="form-group">
                <label>Product Name:</label>
                <input
                    type="text"
                    name="product_name"
                    value={form.product_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Description:</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label>Price (₹):</label>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Category:</label>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Category --</option>
                    {Object.keys(categoryCertifications).map((cat) => (
                        <option key={cat} value={cat}>
                            {cat[0].toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {certOptions.length > 0 && (
                <div className="form-group">
                    <label>Select Certifications:</label>
                    <div className="certification-group">
                        {certOptions.map((cert) => (
                            <label key={cert} className="checkbox-group">
                                <input
                                    type="checkbox"
                                    value={cert}
                                    checked={form.certifications.includes(cert)}
                                    onChange={handleCertChange}
                                />
                                {cert}
                            </label>
                        ))}
                    </div>
                </div>

            )}

            {form.category &&
                categoryExtraFields[form.category] &&
                categoryExtraFields[form.category].map((field) => (
                    <div key={field.name} className="form-group">
                        <label>{field.label}:</label>
                        {field.type === "select" ? (
                            <select
                                name={field.name}
                                value={form[field.name] || ""}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select --</option>
                                {field.options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt === "1" ? "Yes" : "No"}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={form[field.name] || ""}
                                onChange={handleChange}
                                required
                                min={field.min}
                                max={field.max}
                                step={field.step}
                            />
                        )}
                    </div>
                ))}

            <button type="submit" className="submit-btn">
                {loading ? "Submitting..." : "Submit"}
            </button>

            {ecoScore !== null && (
                <div className="eco-score">
                    Eco-Score: {ecoScore}
                </div>
            )}

            {error && (
                <div className="error-msg">
                    {error}
                </div>
            )}
        </form>
    );
};

export default ProductForm;