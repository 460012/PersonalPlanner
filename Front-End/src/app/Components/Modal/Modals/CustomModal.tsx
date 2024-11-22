import React from 'react';
import Modal from 'react-modal';
import { useModal, ModalTypes } from '../ModalContext'; // Import useModal hook

const CustomModal = () => {
  const { closeModal, modalContent, modalIsOpen, currentModalType } = useModal();

  let modalStyle = {};
  let otherStyling = {}; //for removing predefined styling outside of the close button

  switch (currentModalType) {
    case ModalTypes.FULLSCREEN:
      modalStyle = {};
      break;
    case ModalTypes.SMALLBOX:
      modalStyle = {
        content: {
          width: '50%',
          height: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      break;
      case ModalTypes.SMALLBOXMINIMUM:
        //minStyling = true;
        otherStyling = {
          minWidth: '100%',
          minHeight: '100%',
          display: 'flex',
        }

        modalStyle = {
          content: {
            width: '50%',
            height: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        };
        break;
    default:
      break;
  }

  //console.log('Modal Content: ', modalContent);

  return (
    <Modal
      isOpen={modalIsOpen} // Check if modalContent is a function
      onRequestClose={closeModal}
      style={modalStyle}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <button className='bg-BTBlue hover:bg-BTBlue-dark px-4 py-2 rounded-md mt-4'
              style={{ 
                        position: 'absolute', right: '5px', top: '-10px',
                        borderRadius: '50%', border: 'none', display: 'flex', 
                        justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
                    }}
              onClick={closeModal}
      >
        <span style={{ color: 'blue', fontSize: '20px' }}>X</span>
      </button>

      {modalContent && typeof modalContent === 'object' && (
        <div style={otherStyling ? { ...otherStyling } : {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%', // Ensure the modal takes up the full height of the viewport
          padding: '20px', // Adjust padding as needed
        }}>
          {modalContent}
        </div>
      )} {/* Ensure modalContent is a function before calling it */}
    </Modal>
  );
};

export default CustomModal;
