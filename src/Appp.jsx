import React, { useState } from 'react';
import Thenavbar from './Navbar.jsx';
import FormsInput from './FormsInput.jsx'; // Adjust the import path as necessary
import Mymain from './MyMain.jsx';

function Appp() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
       <Mymain openModal={() => setModalIsOpen(true)} />
      <Thenavbar openModal={() => setModalIsOpen(true)} />
      <FormsInput modalIsOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
    </div>
    
  );
}
export default Appp;
