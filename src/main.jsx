import React from 'react';
import ReactDOM from 'react-dom/client';
import Thenavbar from './Navbar'; // Adjust path as needed
import SectionComp from './SectionCopm'; // Adjust path as needed
import CarsComp from './CarsComp'; // Adjust path as needed
import Appp from './Appp'; // Your main app component
import { ModalProvider } from './ModalContext'; // Adjust path as needed
import Features from './Featues';
import Footer from './Footer';
import Mymain from './MyMain';

// Render Navbar
ReactDOM.createRoot(document.getElementById('navigation')).render(
    <ModalProvider>
      <Thenavbar />
    </ModalProvider>
);
ReactDOM.createRoot(document.getElementById('mymain')).render(

  <Mymain />
 

);

// Render Section Component
ReactDOM.createRoot(document.getElementById('sections')).render(

    <SectionComp />
 
);
ReactDOM.createRoot(document.getElementById('features')).render(
  <ModalProvider>
    <Features />
 </ModalProvider>
);

// Render Cars Component
ReactDOM.createRoot(document.getElementById('Cars')).render(
  <ModalProvider>
    <CarsComp />
    </ModalProvider>
);

// Render Main App (with ModalProvider at the top level if it's not already included in App)
ReactDOM.createRoot(document.getElementById('Root')).render(
  <ModalProvider>
  <Appp />
</ModalProvider>
);
ReactDOM.createRoot(document.getElementById('footer')).render(
  
    <Footer/>
  
);


