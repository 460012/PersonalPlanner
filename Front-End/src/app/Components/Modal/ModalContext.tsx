import React, { createContext, useContext, useState } from 'react';

export enum ModalTypes {
  FULLSCREEN = 'fullscreen',
  SMALLBOX = 'smallbox',
  SMALLBOXMINIMUM = 'smallboxminimum',
}

interface ModalContextType {
    openModal: (modalContent: () => React.ReactNode, modalType: ModalTypes) => void;
    closeModal: () => void;
    modalContent: (() => React.ReactNode) | null;
    currentModalType: ModalTypes;
    modalIsOpen: boolean; // Include modalIsOpen property
  }
  

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<(() => React.ReactNode) | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentModalType, setCurrentModalType] = useState(ModalTypes.FULLSCREEN);

  const openModal = (content: () => React.ReactNode, type: ModalTypes) => {
    setModalIsOpen(true);
    setModalContent(content);
    setCurrentModalType(type);

    //console.log('Content: ', content);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalContent, currentModalType, modalIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
