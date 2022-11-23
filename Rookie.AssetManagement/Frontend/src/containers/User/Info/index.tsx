import React from "react";
import { Modal, } from "react-bootstrap";
import { User } from "react-feather";
import {
    AdminUserTypeLabel,
    StaffUserTypeLabel,
    AdminUserType,
    StaffUserType
} from "src/constants/User/UserContants";

import IUser from "src/interfaces/User/IUser";

type Props = {
    user: IUser;
    handleClose: () => void;
};

const Info: React.FC<Props> = ({ user, handleClose }) => {
    const getUserTypeName = (type: string) => {
        return type == AdminUserType ? AdminUserTypeLabel : StaffUserTypeLabel;
    }
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
                        <div className='row -intro-y'>
                            <div className='col-5'>Staff Code:</div>
                            <div>{user.staffCode}</div>
                        </div>

                        <div className='row -intro-y'>
                            <div className='col-5'>Fisrt Name:</div>
                            <div>{user.firstName}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Username:</div>
                            <div>{user.userName}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Gender:</div>
                            <div>{user.gender}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Date Of Birth:</div>
                            <div>{user.dateOfBirth}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Join Date:</div>
                            <div>{user.joinedDate}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Role Type:</div>
                            <div>{getUserTypeName(user.type)}</div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Info;