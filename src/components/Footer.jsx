import "./Footer.css";

export default function Footer() {

    
    return (
        <>
            

            {/* ================= FOOTER ================= */}
            <footer className="site-footer">

                <div className="footer-container">

                    <div className="footer-main">

                        {/* BRAND */}
                        <div className="footer-brand">

                            <a href="/" className="footer-logo">
                                <span className="footer-logo-mark">
                                    E
                                </span>
                                <span>EDUCATION</span>
                            </a>

                            <p>
                                Learn new skills, build your future,
                                and grow with courses designed for
                                real-world learning.
                            </p>

                            <div className="footer-socials">
                                <a href="#" aria-label="Facebook">f</a>
                                <a href="#" aria-label="Instagram">◎</a>
                                <a href="#" aria-label="Twitter">𝕏</a>
                                <a href="#" aria-label="LinkedIn">in</a>
                            </div>

                        </div>

                        {/* COMPANY */}
                        <div className="footer-column">
                            <h4>Company</h4>

                            <a href="#about">About Us</a>
                            <a href="#courses">Courses</a>
                            <a href="#teachers">Our Teachers</a>
                            <a href="#contact">Contact</a>
                        </div>

                        {/* SUPPORT */}
                        <div className="footer-column">
                            <h4>Support</h4>

                            <a href="#faq">FAQ</a>
                            <a href="#help">Help Center</a>
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#terms">Terms & Conditions</a>
                        </div>

                        {/* NEWSLETTER */}
                        <div className="footer-newsletter">

                            <h4>Stay Connected</h4>

                            <p>
                                Subscribe to receive the latest
                                courses and learning updates.
                            </p>

                            <form className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                />

                                <button type="submit">
                                    →
                                </button>
                            </form>

                        </div>

                    </div>

                    <div className="footer-bottom">

                        <p>
                            © 2026 Education. All rights reserved.
                        </p>

                        <p>
                            Learn. Grow. Succeed.
                        </p>

                    </div>

                </div>

            </footer>
        </>
    )
}
