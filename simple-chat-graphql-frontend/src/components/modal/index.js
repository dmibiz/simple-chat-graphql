import { Modal as DynamicModal, ModalManager, Effect } from 'react-dynamic-modal';

const Modal = ({ title, children, onConfirmButtonClick}) => {
    return (
        <DynamicModal effect={Effect.ScaleUp}>
            <div className="modal-header">
                <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={ModalManager.close}>Close</button>
                <button type="button" className="btn btn-primary" onClick={onConfirmButtonClick ? onConfirmButtonClick : ModalManager.close}>OK</button>
            </div>
        </DynamicModal>
    )
}

export default Modal;