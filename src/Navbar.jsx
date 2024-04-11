import React from 'react';
import { useModal } from './ModalContext'; // Make sure the path is correc
function Thenavbar() {
  const modalContext = useModal();
  console.log(modalContext); // This should log the context value
  const { openModal } = useModal();
    return(
      <header className="header" id="header">
      <nav className="nav container">
          <a href="#" className="nav__logo"> 
              <i className="ri-steering-line">  
              </i>estimihali
          </a>
          <div className="nav__menu show-menu" id="nav-menu">
              <ul className="nav__list">
                  <li className="nav__item">
                      <a href="#home" className="nav__link active-link">
                         home
                      </a>
                  </li>
                  <li className="nav__item">
                      <a href="#about" className="nav__link">
                          about
                      </a>
                  </li>
                  <li className="nav__item">
                      <a href="#popular" className="nav__link">
                          popular
                      </a>
                  </li>
                  <li className="nav__item">
                      <a href="#featured" className="nav__link">
                          featured
                      </a>
                  </li>
                  <li className="nav__item">
                      <a  className="nav__link" onClick={openModal}>
                          Estimate
                      </a>
                  </li>
              </ul>
              <div className="nav__close" id="nav-close">
                  <i className="ri-close-line"></i>
              </div>
          </div>
                          
          <div className="nav__toggle" id="nav-toggle">
              <i className="ri-menu-fill"></i>
          </div>
      </nav>
  </header>
    );
  
}
export default Thenavbar;