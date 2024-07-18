import React from "react"
import modalOverlayStyles from './modal-overlay.module.css'
import { ModalOverlayProps } from "../../services/types";

const ModalOverlay = ({ onClick, children }: ModalOverlayProps): React.JSX.Element | null => {
	return (
		<div onClick={onClick} className={modalOverlayStyles.modalOverlay}>
			{children}
		</div>
	)
}

export default ModalOverlay;