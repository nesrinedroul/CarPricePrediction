import React, { useState } from 'react';
import { useModal } from './ModalContext'; 

function Thenavbar() {
    const { openModal } = useModal(); // Destructure directly from the hook
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

    // Toggle menu visibility
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="header" id="header">
            <nav className="nav container">
                <a href="#" className="nav__logo"> 
                    <i className="ri-steering-line"></i>
                    estimihali
                </a>

                {/* Conditional rendering of menu based on state */}
                <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`} id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link" onClick={closeMenu}>
                               home
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#about" className="nav__link" onClick={closeMenu}>
                                about
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#popular" className="nav__link" onClick={closeMenu}>
                                popular
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#featured" className="nav__link" onClick={closeMenu}>
                                featured
                            </a>
                        </li>
                        <li className="nav__item">
                            <a className="nav__link" onClick={openModal}>
                                Estimate
                            </a>
                        </li>
                    </ul>
                    <div className="nav__close" id="nav-close" onClick={closeMenu}>
                        <i className="ri-close-line"></i>
                    </div>
                </div>

                {/* Button to toggle menu */}
                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    <i className="ri-menu-fill"></i>
                </div>
            </nav>
        </header>
    );
}

export default Thenavbar;
