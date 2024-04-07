
  import React from 'react';
import { useModal } from './ModalContext'; // Make sure the path is correc
function Thenavbar() {
  const modalContext = useModal();
  console.log(modalContext); // This should log the context value
  const { openModal } = useModal();
    return(
        <header>
          <div className="nav container">
              <i className='bx bx-user' id="menu-icon"></i>
               <a href="#"><img src='/logoo.png' alt="pc" className="logo"></img></a>
              <ul className="navbar">
                <li><a href="#home" className="active">home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#cars">Services</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
             <button id='est' onClick={openModal}>Estimate</button>
       </div>
          </header>
    );
  
}
export default Thenavbar;