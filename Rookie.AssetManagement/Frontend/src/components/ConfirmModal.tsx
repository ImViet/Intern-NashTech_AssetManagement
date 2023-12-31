import React, { Fragment } from "react";
import { Modal } from 'react-bootstrap';

type Props = {
    title: string,
    isShow: boolean,
    onHide?: (() => void),
    children: React.ReactNode,
    dialogClassName?: string
}

const ConfirmModal: React.FC<Props> = ({ title, isShow, onHide, children, dialogClassName = "" }) => {

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            dialogClassName={`modal-90w ${dialogClassName}`}
            aria-labelledby="login-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="login-modal">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Fragment>
                    {children}
                </Fragment>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmModal;
