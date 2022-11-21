import React from "react";
import { Modal, } from "react-bootstrap";

import IUser from "src/interfaces/User/IUser";

type Props = {
    user: IUser;
    handleClose: () => void;
};

const Info: React.FC<Props> = ({ user, handleClose }) => {

    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="login-modal">
                        Detailed User Infomation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Info;