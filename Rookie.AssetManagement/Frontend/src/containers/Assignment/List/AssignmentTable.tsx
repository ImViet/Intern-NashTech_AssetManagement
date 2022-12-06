import React, { useState } from "react";
import { ArrowCounterclockwise, PencilFill, XCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import ButtonIcon from "src/components/ButtonIcon";
import { NotificationManager } from 'react-notifications';

import Table, { SortType } from "src/components/Table";
import IColumnOption from "src/interfaces/IColumnOption";
import IPagedModel from "src/interfaces/IPagedModel";
import formatDateTime, { convertDDMMYYYY } from "src/utils/formatDateTime";
// import Info from "../Info";
//import { disableUser } from "../reducer";

import { EDIT_ASSET_ID } from "src/constants/pages";
import ConfirmModal from "src/components/ConfirmModal";
import { useAppDispatch } from "src/hooks/redux";
import IAssignment from "src/interfaces/Assignment/IAssignment";


const columns: IColumnOption[] = [
    { columnName: "No.", columnValue: "id" },
    { columnName: "Asset Code ", columnValue: "assetCode" },
    { columnName: "Asset Name ", columnValue: "assetName" },
    { columnName: "Assigned to ", columnValue: "assignedTo" },
    { columnName: "Assigned by ", columnValue: "assignedBy" },
    { columnName: "Assigned Date ", columnValue: "assignedDate" },
    { columnName: "State ", columnValue: "state" },
];

type Props = {
    assignments: IPagedModel<IAssignment> | null;
    result: IAssignment | null;
    handlePage: (page: number) => void;
    handleSort: (colValue: string) => void;
    handleDisable: Function;
    sortState: SortType;
    fetchData: Function;
};

const AssignmentTable: React.FC<Props> = ({
    assignments,
    result,
    handlePage,
    handleSort,
    sortState,
    fetchData,
    handleDisable,
}) => {
    const dispatch = useAppDispatch();

    const [showDetail, setShowDetail] = useState(false);
    // const [userDetail, setUserDetail] = useState(null as IAssignment | null);
    const [disableState, setDisable] = useState({
        isOpen: false,
        id: 0,
        title: '',
        message: '',
        isDisable: true,
    });

    const handleShowDisable = async (id: number) => {
        // setDisable({
        //   id,
        //   isOpen: true,
        //   title: 'Are you sure?',
        //   message: 'Do you want to delete this assignment?',
        //   isDisable: true,
        // });
    };

    const handleCloseDisable = () => {
        // setDisable({
        //   isOpen: false,
        //   id: 0,
        //   title: '',
        //   message: '',
        //   isDisable: true,
        // });
    };

    const onDisable = () => {
        // handleDisable(disableState.id)
        // setDisable({
        //   isOpen: false,
        //   id: 0,
        //   title: '',
        //   message: '',
        //   isDisable: true,
        // });
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
    };

    const navigate = useNavigate();
    const handleEdit = (id: number) => {
        //navigate(EDIT_ASSET_ID(id));
    };

    let rows
    if (result && assignments) {
        rows = [...assignments.items]
        const index = rows.findIndex(r => r.id === result.id)
        if (index >= 0) {
            rows.splice(index, 1)
        }
        rows.unshift(result)
    } else if (assignments) {
        rows = [...assignments.items]
    }
    return (
        <>
            <Table
                columns={columns}
                handleSort={handleSort}
                sortState={sortState}
                page={{
                    currentPage: assignments?.currentPage,
                    totalPage: assignments?.totalPages,
                    handleChange: handlePage,
                }}
            >
                {rows?.map((data, index) => (
                    <tr key={index} className="">
                        <td>{data.no}</td>
                        <td>{data.assetCode}</td>
                        <td>{data.assetName}</td>
                        <td>{data.assignedTo}</td>
                        <td>{data.assignedBy}</td>
                        <td>{data.assignedDate}</td>
                        <td>{data.state}</td>
                        <td className="d-flex">     
                        {(() => {
                        if (data.state == "Accepted") {
                            return (
                            <>
                                <ButtonIcon disable={true} onClick={() => handleEdit(data.id)}>
                                    <PencilFill className="text-black" />
                                </ButtonIcon>
                                <ButtonIcon disable={true} onClick={() => handleShowDisable(data.id)}>
                                    <XCircle className="text-danger mx-2" />
                                </ButtonIcon> 
                                <ButtonIcon >
                                    <ArrowCounterclockwise className="text-primary " />
                                </ButtonIcon>
                            </>
                            )
                        } else {
                            return (
                            <>
                                <ButtonIcon onClick={() => handleEdit(data.id)}>
                                    <PencilFill className="text-black" />
                                </ButtonIcon>
                                <ButtonIcon onClick={() => handleShowDisable(data.id)}>
                                    <XCircle className="text-danger mx-2" />
                                </ButtonIcon>
                                <ButtonIcon>
                                    <ArrowCounterclockwise fill="" className="text-primary " />
                                </ButtonIcon>
                            </>
                            )
                        }
                        })()}                                     
                        </td>
                    </tr>
        ))}                
            </Table>
            {/* {userDetail && showDetail && (
        <Info user={userDetail} handleClose={handleCloseDetail} />
      )} */}
            <ConfirmModal
                title={disableState.title}
                isShow={disableState.isOpen}
                onHide={handleCloseDisable}
            >
                <div>

                    <div className="text-start">
                        {disableState.message}
                    </div>
                    {
                        disableState.isDisable && (
                            <div className="text-start mt-3">
                                <button
                                    className="btn btn-danger mr-3"
                                    type="button"
                                    onClick={onDisable}
                                >
                                    Delete
                                </button>

                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={handleCloseDisable}
                                    type="button"
                                >
                                    Cancel
                                </button>
                            </div>
                        )
                    }
                </div>
            </ConfirmModal>
        </>
    );
};

export default AssignmentTable;
