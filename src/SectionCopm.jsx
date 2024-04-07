import React from'react';
import { useModal } from './ModalContext';
function SectionComp(){
  const modalContext = useModal();
  const { openModal } = useModal();
return(
    <section className="home" id="home">
    <div className="home-text">
    <h1>Estimihali</h1>
    <p> this is an innovative website using machine learning to offer instant car price estimates. Users input details like make model ect to get valuations based on current market trends. Its user-friendly interface and sophisticated algorithms ensure precise, reliable pricing, making it a valuable tool for anyone looking to buy, sell, or simply understand a car's market value.</p>
   <button className="get" onClick={openModal}>Get started now !</button>
  </div>
</section>
)}
export default SectionComp;