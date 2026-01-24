import "./ProductPage2.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Toast from 'bootstrap/js/dist/toast';


export const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();
    const toastRef = useRef(null);
    const handleAddToCart = () => {
        addToCart(product);

        if (toastRef.current) {
            const toast = new Toast(toastRef.current, { delay: 3000 });
            toast.show();
        }
    };

    const [relatedIds, setRelatedIds] = useState([]);
    const [ecoAlternatives, setEcoAlternatives] = useState([]);

    const handleEcoSwitch = async () => {
        try {
            const aiRes = await axios.get(`http://localhost:5001/api/v1/products/${product.product_id}/eco-alternatives`);

            if (!Array.isArray(aiRes.data)) {
                throw new Error("Invalid format: expected an array");
            }

            const ids = aiRes.data.map(p => p.id);
            if (ids.length === 0) {
                console.log("No eco alternatives found.");
                setEcoAlternatives([]);
                return;
            }
            //console.log('mehul lauda')

            const dbRes = await axios.get(`/api/products/bulk?ids=${ids.join(',')}`);
            console.log(dbRes)
            setEcoAlternatives(dbRes.data);
        } catch (error) {
            console.error("Error in handleEcoSwitch:", error);
            setEcoAlternatives([]);
        }
    };


    useEffect(() => {
        axios
            .get(`/api/product/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error("Error fetching product:", err));
    }, [id]);


    if (!product) return <p className="text-center mt-5">Loading product...</p>;

    return (
        <div>
            <div
                className="toast-container position-fixed bottom-0 end-0 p-3"
                style={{ zIndex: 9999 }}
            >
                <div
                    ref={toastRef}
                    className="toast align-items-center text-bg-success border-0"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body">🛒 Added to cart!</div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        ></button>
                    </div>
                </div>
            </div>

            <main className="container my-5">
                <div className="row g-4">
                    {/* Image Section */}
                    <div className="col-lg-6">
                        <div className="img_card shadow-sm p-2">
                            <img
                                src={product.image}
                                className="img-fluid rounded"
                                alt="Eco-Friendly Reusable Bottle"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="col-lg-6">
                        <div className="card p-4 shadow-sm h-100">
                            <h2 className="fw-bold mb-2">{product.product_name}</h2>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h3 className="text-success mb-0">₹{product.price}</h3>
                            </div>
                            <p className="lead">{product.description}</p>

                            <div className="d-flex align-items-center gap-3 my-4">
                                <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>Add to Cart</button>
                            </div>

                            <div className="bg-light p-4 rounded shadow-sm">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div>
                                        <p className="mb-1 fw-semibold fs-5">
                                            ♻ <strong>Eco Score:</strong> <span className="text-success">{product.eco_score}</span> / 100
                                        </p>
                                    </div>
                                    <div className="text-end mt-3 mt-md-0">
                                        <p className="mb-1 text-muted small">Looking for a greener option?</p>
                                        <button className="btn btn-outline-success btn-sm" onClick={handleEcoSwitch}>
                                            🌱 EcoSwitch AI
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            {ecoAlternatives.length > 0 && (
                <div className="container mb-5">
                    <h4 className="text-success mb-3">♻ Better Eco-Friendly Alternatives:</h4>
                    <div className="row">
                        {ecoAlternatives.map((altProduct) => (
                            <div className="col-md-4 mb-4" key={altProduct.product_id}>
                                <div className="card shadow-sm h-100">
                                    <img
                                        src={altProduct.image}
                                        className="card-img-top"
                                        alt={altProduct.product_name}
                                        style={{ maxHeight: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{altProduct.product_name}</h5>
                                        <p className="card-text">{altProduct.description?.slice(0, 80)}...</p>
                                        <p className="card-text text-success">Eco Score: {altProduct.eco_score} / 100</p>
                                        <p className="card-text fw-bold">₹{altProduct.price}</p>
                                        <a href={`/product/${altProduct.product_id}`} className="btn btn-outline-primary btn-sm">
                                            View Product
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};