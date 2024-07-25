import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ModalProps } from "../../services/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ isOpen, onClose, children, title }: ModalProps): React.JSX.Element | null => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const modalRoot = document.getElementById("root-portal");
  if (!isOpen || !modalRoot) {
    return null;
  }

  const handleOverlayClick = () => {
    onClose();
  };

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick}>
      <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyles.modalHeader}>
        {title && <h1 className="text text_type_main-large ml-4">{title}</h1>}

          <div onClick={onClose} className={modalStyles.closeButtonContainer}>
            <CloseIcon type="primary"/>
          </div>
        </div>
        <div className={modalStyles.modalContent}>{children}</div>
      </div>
    </ModalOverlay>
  );

  return ReactDOM.createPortal(modalContent, modalRoot);
};

export default Modal;
