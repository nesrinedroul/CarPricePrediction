import React from 'react';

function Footer() {
    // Function to handle scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // Smooth scroll to top
        });
    };

    return (
        <>
            <footer className="footer section">
                <div className="shape shape__big"></div>
                <div className="shape shape__small"></div>
                <div className="footer__container container grid">
                    <div className="footer__content">
                        <a href="#" className="footer__logo">
                            <i className="ri-steering-fill"></i>Estimihali
                        </a>
                        <p className="footer__description">We offer the most accurate car prices<br/>in the world.</p>
                    </div>
                    <div className="footer__content">
                        <h3 className="footer__title">Information</h3>
                        <ul className="footer__links">
                            <li><a className="footer__link">Request a quote</a></li>
                            <li><a href="#" className="footer__link">Find a dealer</a></li>
                            <li><a href="#" className="footer__link">Contact us</a></li>
                            <li><a href="#" className="footer__link">Services</a></li>
                        </ul>
                    </div>
                    <div className="footer__content">
                        <h3 className="footer__title">Company</h3>
                        <ul className="footer__links">
                            <li><a href="#" className="footer__link">About</a></li>
                            <li><a href="#" className="footer__link">Cars</a></li>
                            <li><a href="#" className="footer__link">History</a></li>
                            <li><a href="#" className="footer__link">Shop</a></li>
                        </ul>
                    </div>
                </div>
            </footer>

            <a href="#" onClick={scrollToTop} className="scrollup" id="scroll-up">
                <i className="ri-arrow-up-line"></i>
            </a>
        </>
    );
}

export default Footer;

