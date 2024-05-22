// Thenavbar.js
import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

function Thenavbar() {
  const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const header = document.querySelector(".header");

    if (!header) {
      console.error("Header element not found at mount");
      return;
    }

    let lastScrollTop = 0;

    const onScroll = () => {
      const headerElement = document.querySelector(".header");
      if (!headerElement) {
        console.error("Header element not found during scroll");
        return;
      }

      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        headerElement.style.top = "-100px"; // Adjust this value based on your header height
      } else {
        headerElement.style.top = "0";
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          <i className="ri-steering-line"></i>
          estimihali
        </a>

        <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`} id="nav-menu" style={{ display: 'block' }}>
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
              <a href="#STAT" className="nav__link " onClick={closeMenu}>
               Statics
              </a>
            </li>
            
          </ul>
          <div className="nav__close" id="nav-close" onClick={closeMenu}>
            <i className="ri-close-line"></i>
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <i className="ri-menu-fill"></i>
        </div>
      </nav>
    </header>
  );
}

export default Thenavbar;

