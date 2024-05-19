import React, { useEffect } from 'react';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const scrollUpButton = document.getElementById('scroll-up');
        const handleScroll = () => {
            if (window.scrollY > 200) {
                scrollUpButton.style.display = 'block';
            } else {
                scrollUpButton.style.display = 'none';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <footer className="footer section">
                <div className="footer__container container">
                    <a href="#" className="footer__logo">
                        <i className="ri-steering-fill"></i> Estimihali
                    </a>
                    <div className="footer__links">
                        <a href="#" className="footer__link">Request a quote</a>
                        <a href="#about" className="footer__link">About</a>
                        <a href="#" className="footer__link">Cars</a>
                        <a href="#" className="footer__link">Statistics</a>
                        <a href="#" className="footer__link">FAQ</a>
                        <a href="#" className="footer__link">Support</a>
                    </div>
                    <div className="footer__social-links">
                        <a href="#" className="footer__social-link"><i className="ri-facebook-fill"></i></a>
                        <a href="#" className="footer__social-link"><i className="ri-twitter-fill"></i></a>
                        <a href="#" className="footer__social-link"><i className="ri-instagram-fill"></i></a>
                        <a href="#" className="footer__social-link"><i className="ri-linkedin-fill"></i></a>
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
