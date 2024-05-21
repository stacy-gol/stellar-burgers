import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'; 
import ModalOverlay from '../modal-overlay/modal-overlay';
import closeButton from '../../../src/images/close-icon.png'
import { modalTypes } from '../../utils/types'


const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);


  const modalRoot = document.getElementById('root-portal');
  if (!isOpen || !modalRoot) {
    return null;
  }

  const handleOverlayClick = (event) => {
    onClose();
  };

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick}>
      <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyles.modalHeader}>
        </div>
        <img
            onClick={onClose}
            className={modalStyles.closeIcon}
            src={closeButton}
            alt="Закрыть"
          />
        <div className={modalStyles.modalContent}>
          {children}
        </div>
      </div>
    </ModalOverlay>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
};

Modal.propTypes = modalTypes;

export default Modal;