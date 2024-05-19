import React from 'react';
import ReactDOM from 'react-dom/client';
import Thenavbar from './Navbar'; // Adjust path as needed
import SectionComp from './SectionCopm'; // Adjust path as needed
import CarsComp from './CarsComp'; // Adjust path as needed
import Appp from './Appp'; // Your main app component
import { ModalProvider } from './ModalContext'; // Adjust path as needed
import Features from './Featues';
import Footer from './Footer';
import StatisticsPage from './StaticsPage';


// Render Navbar
ReactDOM.createRoot(document.getElementById('navigation')).render(
    <ModalProvider>
      <Thenavbar />
    </ModalProvider>
);

ReactDOM.createRoot(document.getElementById('Cars')).render(
  <ModalProvider>
    <CarsComp />
    </ModalProvider>
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
ReactDOM.createRoot(document.getElementById('Root')).render(
  <ModalProvider>
  <Appp />
</ModalProvider>
);
ReactDOM.createRoot(document.getElementById('footer')).render(
  
    <Footer/>
  
);
ReactDOM.createRoot(document.getElementById('STAT')).render(
  
  <StatisticsPage/>

);
