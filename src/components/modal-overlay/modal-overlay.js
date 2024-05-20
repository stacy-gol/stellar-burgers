import React from "react"
import modalOverlayStyles from './modal-overlay.module.css'

function ModalOverlay({ onClick, children }) {
	return (
		<div onClick={onClick} className={modalOverlayStyles.modalOverlay}>
			{children}
		</div>
	)
}

export default ModalOverlay;