import React from "react";
import { Modal, } from "react-bootstrap";
import { User } from "react-feather";
import {
    AdminUserTypeLabel,
    StaffUserTypeLabel,
    AdminUserType,
    StaffUserType
} from "src/constants/User/UserContants";
import formatDateTime, { convertDDMMYYYY } from "src/utils/formatDateTime";
import IAssignment from "src/interfaces/Assignment/IAssignment";

type Props = {
    assignment: IAssignment;
    handleClose: () => void;
};

const Info: React.FC<Props> = ({ assignment, handleClose }) => {
    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                dialogClassName="detail-modal modal-90w"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="login-modal">
                        Detailed Assignment Infomation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Asset Code</div>
                            <div>{assignment.assetCode}</div>
                        </div>

                        <div className='row -intro-y'>
                            <div className='col-5'>Asset Name</div>
                            <div>{assignment.assetName}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Specification</div>
                            <div>{assignment.specification}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Assigned to</div>
                            <div>{assignment.assignedTo}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Assigned by</div>
                            <div>{assignment.assignedBy}</div>
                        </div> 
                        <div className='row -intro-y'>
                            <div className='col-5'>Assigned Date</div>
                            <div>{assignment.assignedDate}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>State</div>
                            <div>{assignment.state}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Note</div>
                            <div>{assignment.note}</div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Info;