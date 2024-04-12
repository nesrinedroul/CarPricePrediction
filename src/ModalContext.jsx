import React, { createContext, useState, useContext } from 'react';

// Create modal context
const ModalContext = createContext({
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {}
});

// Custom hook to access modal context
export const useModal = () => useContext(ModalContext);

// Modal provider component
export const ModalProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to open modal
  const openModal = () => setModalIsOpen(true);

  // Function to close modal
  const closeModal = () => setModalIsOpen(false);

  // Provide modal state and functions to children
  return (
    <ModalContext.Provider value={{ modalIsOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
