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
import IAsset from "src/interfaces/Asset/IAsset";

type Props = {
    asset: IAsset;
    handleClose: () => void;
};

const Info: React.FC<Props> = ({ asset, handleClose }) => {

    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                dialogClassName="detail-modal modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="login-modal">
                        Detailed Asset Infomation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Asset Code:</div>
                            <div>{asset.assetCode}</div>
                        </div>

                        <div className='row -intro-y'>
                            <div className='col-5'>Asset Name:</div>
                            <div>{asset.assetName}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Category:</div>
                            <div>{asset.category}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Installed Date:</div>
                            <div>{convertDDMMYYYY(asset.installedDate)}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>State:</div>
                            <div>{asset.state}</div>
                        </div> 
                        <div className='row -intro-y'>
                            <div className='col-5'>Location:</div>
                            <div>{asset.location}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>Specification:</div>
                            <div>{asset.specification}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-5'>History:</div>
                            <div>
                                
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Info;