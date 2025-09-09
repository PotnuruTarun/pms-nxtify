import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_URL = "https://pms-nxtify.onrender.com/api/products";

function ProductCarousel() {
    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(API_URL);
                // Show at most 4 most recent products
                const all = res.data || [];
                setProducts(all.slice(-4).reverse());
            } catch (err) {
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Auto-slide logic
    const intervalRef = useRef();
    useEffect(() => {
        if (!products.length) return;
        intervalRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, 2500); // 2.5 seconds
        return () => clearInterval(intervalRef.current);
    }, [products]);

    // Manual navigation
    const goPrev = () => setCurrent((prev) => (prev - 1 + products.length) % products.length);
    const goNext = () => setCurrent((prev) => (prev + 1) % products.length);

    if (loading) return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 260, width: '100%',
            background: 'linear-gradient(90deg, #f3e7e9 0%, #e3eeff 100%)',
            borderRadius: 24, boxShadow: '0 4px 32px 0 rgba(80,80,120,0.08)', padding: '32px 0', margin: '32px 0'
        }}>
            <div style={{
                fontWeight: 700, fontSize: 26, marginBottom: 24, color: '#fff',
                background: 'linear-gradient(90deg, #8D6748 0%, #BFA181 100%)',
                borderRadius: 16, boxShadow: '0 2px 12px 0 rgba(141,103,72,0.10)',
                padding: '12px 36px', letterSpacing: 0.5, textShadow: '0 2px 8px rgba(0,0,0,0.10)'
            }}>Recently Added</div>
            <div className="spinner" style={{ width: 48, height: 48, border: '5px solid #eee', borderTop: '5px solid #8D6748', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
    );
    if (error) return <div style={{ color: '#c00', textAlign: 'center', padding: 32 }}>{error}</div>;
    if (!products.length) return <div style={{ textAlign: 'center', padding: 32 }}>No products to show.</div>;

    const product = products[current];
    return (
        <div style={{
            width: '100%',
            maxWidth: '100vw',
            minHeight: 260,
            position: 'relative',
            margin: '3vh 0',
            overflow: 'visible',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontWeight: 700, fontSize: 26, marginBottom: 0, color: '#fff',width: '100%',
                background: 'linear-gradient(90deg, #8D6748 0%, #BFA181 100%)',
                padding: '12px 36px', letterSpacing: 0.5, textShadow: '0 2px 8px rgba(0,0,0,0.10)'
            }}>Recently Added</div>
            {/* Left Arrow */}
            <button onClick={goPrev} aria-label="Previous" style={{
                position: 'absolute',
                left: 0,
                top: '60%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                border: 'none',
                borderRadius: '50%',
                background: 'none',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                color: '#222',
                cursor: 'pointer',
                outline: 'none',
            }}>&lt;</button>

            {/* Main Slide Content */}
            <div style={{
                width: '100%',
                maxWidth: 900,
                margin: '0 auto',
                borderRadius: 18,
                padding: '12px 10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 180,
                position: 'relative',
            }}>
                <div style={{ flex: 1, textAlign: 'center', padding: 0 }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#222', marginBottom: 8 }}>Name: {product.name}</div>
                    <div style={{ color: '#BFA181', fontWeight: 500, marginBottom: 8, fontSize: 18 }}>Category: {product.category}</div>
                    <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Price: ₹{product.price}</div>
                </div>
            </div>

            {/* Right Arrow */}
            <button onClick={goNext} aria-label="Next" style={{
                position: 'absolute',
                right: 0,
                top: '60%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                border: 'none',
                borderRadius: '50%',
                background: 'none',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                color: '#222',
                cursor: 'pointer',
                outline: 'none',
            }}>&gt;</button>

            {/* Dot Indicators */}
            <div style={{
                position: 'absolute',
                left: '50%',
                bottom: 16,
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 8,
                zIndex: 3,
            }}>
                {products.map((_, idx) => (
                    <span key={idx} style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: idx === current ? '#222' : '#ccc',
                        display: 'inline-block',
                        transition: 'background 0.2s',
                    }} />
                ))}
            </div>
        </div>
    );
}

export default ProductCarousel;
