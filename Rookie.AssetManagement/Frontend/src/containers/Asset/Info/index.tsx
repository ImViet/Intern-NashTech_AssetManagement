import React, { useEffect } from "react";
import { Modal, } from "react-bootstrap";

import formatDateTime, { convertDDMMYYYY } from "src/utils/formatDateTime";
import IAsset from "src/interfaces/Asset/IAsset";
import AssetDetailTable from "./AssetDetailTable";
//import { useAppSelector } from "src/hooks/redux";


type Props = {
    asset: IAsset;
    handleClose: () => void;
};
//const { assets, actionResult } = useAppSelector((state) => state.assetReducer);
const Info: React.FC<Props> = ({ asset, handleClose }) => {
    const handlePage = (page: number) => {

    };
    const handleSort = (sortColumn: string) => { }
    const handleDisable = (id) => { }
    const fetchData = () => {
        //dispatch(getAssetList(query))
    };
    useEffect(() => {

        fetchData()
    }, []);
    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                dialogClassName="detail-modal model-info-asset modal-90w"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="login-modal">
                        Detailed Asset Infomation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="table-detail">
                        <div className='row -intro-y'>
                            <div className='col-3'>Asset Code</div>
                            <div className='col-4'>{asset.assetCode}</div>
                        </div>

                        <div className='row -intro-y'>
                            <div className='col-3'>Asset Name</div>
                            <div className='col-4'>{asset.assetName}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-3'>Category</div>
                            <div className='col-4'> {asset.category}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-3'>Installed Date</div>
                            <div className='col-4'>{convertDDMMYYYY(asset.installedDate)}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-3'>State</div>
                            <div className='col-4'>{asset.state}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-3'>Location</div>
                            <div className='col-4'>{asset.location}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-3'>Specification</div>
                            <div className='col-4'>{asset.specification}</div>
                        </div>
                        <div className='row -intro-y'>
                            <div className='col-3'>History</div>
                            <div>
                                <AssetDetailTable
                                    assetHistory={null}
                                    result={null}
                                    fetchData={fetchData}
                                />

                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Info;