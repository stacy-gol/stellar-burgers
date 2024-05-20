import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'; 
import ModalOverlay from '../modal-overlay/modal-overlay';
import closeButton from '../../../src/images/close-icon.png'

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
        <div className={`${modalStyles.modalHeader} mt-10 ml-10 mr-10`}>
          <p className="text text_type_main-large">Детали ингредиента</p>
          <img
            onClick={onClose}
            className={modalStyles.closeIcon}
            src={closeButton}
            alt="Закрыть"
          />
        </div>
        <div className={modalStyles.modalContent}>
          {children}
        </div>
      </div>
    </ModalOverlay>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;