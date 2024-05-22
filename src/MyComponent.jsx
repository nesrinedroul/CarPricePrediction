import React, { useState } from 'react';

const YourComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle blur effect and open modal
  const openModal = () => {
    document.body.classList.add('blur'); // Add blur class to body
    setIsModalOpen(true); // Open modal
  };

  // Function to close modal and remove blur effect
  const closeModal = () => {
    document.body.classList.remove('blur'); // Remove blur class from body
    setIsModalOpen(false); // Close modal
  };

  return (
    <div>
      {/* Your JSX code for rendering cards */}
      <div className="popular__container">
        {/* Example of a card */}
        <div className="popular__card" onClick={openModal}>
          {/* Card content */}
        </div>
      </div>

      {/* Modal JSX */}
      {isModalOpen && (
        <div className="modalWrapper">
          <div className="myModal">
            {/* Modal content */}
            <button className="close" onClick={closeModal}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
