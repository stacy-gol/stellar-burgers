import React from "react"
import modalOverlayStyles from './modal-overlay.module.css'
import { modalOverlayTypes } from '../../utils/types'
function ModalOverlay({ onClick, children }) {
	return (
		<div onClick={onClick} className={modalOverlayStyles.modalOverlay}>
			{children}
		</div>
	)
}

ModalOverlay.propTypes = modalOverlayTypes;

export default ModalOverlay;