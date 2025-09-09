
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const brown = "#8D6748";
const lightBrown = "#F5EFE6";
const accent = "#BFA181";

function animateHero(refs) {
    if (!refs.current) return;
    refs.current.forEach((el, i) => {
        if (el) {
            el.style.opacity = 0;
            el.style.transform = 'translateY(40px) scale(0.98)';
            setTimeout(() => {
                el.style.transition = 'opacity 0.7s cubic-bezier(.6,.2,.2,1), transform 0.7s cubic-bezier(.6,.2,.2,1)';
                el.style.opacity = 1;
                el.style.transform = 'translateY(0) scale(1)';
            }, 200 + i * 180);
        }
    });
}

function Landing() {
    const navigate = useNavigate();
    const heroRefs = useRef([]);

    useEffect(() => {
        animateHero(heroRefs);
    }, []);

    return (
        <div style={{ fontFamily: 'Poppins, Inter, sans-serif', background: lightBrown, color: brown, Height: '100vh' }}>
            {/* Animated Hero Section */}
            <section style={{
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: lightBrown
            }}>
                {/* Decorative shapes */}
                <div style={{ position: 'absolute', left: 0, top: 0, width: 180, height: 180, background: '#C7E8C7', borderBottomRightRadius: 80, zIndex: 0 }} />
                <div style={{ position: 'absolute', right: 0, top: 0, width: 220, height: 180, background: '#D6D6F7', borderBottomLeftRadius: 80, zIndex: 0 }} />
                {/* Plant image left (hidden on mobile) */}
                <img
                    ref={el => heroRefs.current[0] = el}
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80"
                    alt="plant"
                    className="landing-hero-img landing-hero-img-left"
                    style={{ position: 'absolute', left: 32, bottom: 0, width: 120, height: 160, objectFit: 'cover', borderRadius: 24, boxShadow: '0 8px 32px rgba(141,103,72,0.10)', zIndex: 1, display: 'block' }}
                />
                {/* Gift image right (hidden on mobile) */}
                <img
                    ref={el => heroRefs.current[1] = el}
                    src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80"
                    alt="gift"
                    className="landing-hero-img landing-hero-img-right"
                    style={{ position: 'absolute', right: 32, bottom: 0, width: 140, height: 140, objectFit: 'cover', borderRadius: 24, boxShadow: '0 8px 32px rgba(191,161,129,0.10)', zIndex: 1, display: 'block' }}
                />
                {/* Title and description */}
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: 40 }}>
                    <h1
                        ref={el => heroRefs.current[2] = el}
                        style={{
                            fontSize: 44,
                            fontWeight: 700,
                            color: brown,
                            margin: 0,
                            letterSpacing: 0.01,
                            lineHeight: 1.1
                        }}
                    >
                        Product Management System
                    </h1>
                    <p
                        ref={el => heroRefs.current[3] = el}
                        style={{
                            fontSize: 20,
                            color: accent,
                            margin: '18px 0 32px 0',
                            fontWeight: 500
                        }}
                    >
                        Effortlessly manage, track, and grow your products in one beautiful dashboard.
                    </p>
                    <button
                        ref={el => heroRefs.current[4] = el}
                        style={{
                            background: brown,
                            color: '#fff',
                            border: 'none',
                            borderRadius: 24,
                            padding: '16px 36px',
                            fontWeight: 700,
                            fontSize: 18,
                            cursor: 'pointer',
                            boxShadow: '0 4px 24px rgba(141,103,72,0.08)',
                            marginBottom: 24,
                            transition: 'background 0.2s'
                        }}
                        onClick={() => navigate('/products')}
                        onMouseOver={e => e.currentTarget.style.background = accent}
                        onMouseOut={e => e.currentTarget.style.background = brown}
                    >
                        Show Products →
                    </button>
                </div>
            </section>




            {/* Footer */}
            <footer style={{ background: lightBrown, padding: '94px 20px 16px 0', textAlign: 'center', color: accent, fontWeight: 500, fontSize: 16 }}>
                &copy; {new Date().getFullYear()} paisawapas. All rights reserved.
            </footer>
        </div>
    );
}

export default Landing;
