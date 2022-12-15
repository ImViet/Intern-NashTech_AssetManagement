import React from "react";
import { Modal, } from "react-bootstrap";
import { User } from "react-feather";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IMyAssignment from "src/interfaces/Assignment/IMyAssignment";
import formatDateTime, { convertDDMMYYYY } from "src/utils/formatDateTime";

type Props = {
    assignment: IMyAssignment;
    handleClose: () => void;
};

const Info: React.FC<Props> = ({ assignment, handleClose }) => {
    console.log(assignment)
    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                dialogClassName="detail-modal modal-90w table-detail-large"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="login-modal">
                        Detailed Assignment Infomation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="">
                        <div className='row -intro-y'>
                            <div className='col-4'>Asset Code</div>
                            <div className='col-6'>{assignment.assetCode}</div>
                        </div>

                        <div className='row -intro-y'>
                            <div className='col-4'>Asset Name</div>
                            <div className='col-6'>{assignment.assetName}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-4'>Specification</div>
                            <div className='col-6'>{assignment.specification}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-4'>Assigned to</div>
                            <div className='col-6'>{assignment.assignedTo}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-4'>Assigned by</div>
                            <div className='col-6'>{assignment.assignedBy}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-4'>Assigned Date</div>
                            <div className='col-6'>{convertDDMMYYYY(assignment.assignedDate)}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-4'>State</div>
                            <div className='col-6'>{assignment.state}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-4'>Note</div>
                            <div className='col-6 scroll'><p>{assignment.note}</p></div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Info;