import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext({
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {}
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <ModalContext.Provider value={{ modalIsOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
