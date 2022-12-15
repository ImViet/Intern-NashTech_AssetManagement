import React, { useState } from "react";
import { ArrowCounterclockwise, CheckLg, PencilFill, XCircle, XLg } from "react-bootstrap-icons";
import ButtonIcon from "src/components/ButtonIcon";

import Table, { SortType } from "src/components/Table";
import IColumnOption from "src/interfaces/IColumnOption";
import IPagedModel from "src/interfaces/IPagedModel";
import { convertDDMMYYYY } from "src/utils/formatDateTime";
import ConfirmModal from "src/components/ConfirmModal";
import { useAppDispatch } from "src/hooks/redux";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import Info from "./Info";
import IMyAssignment from "src/interfaces/Assignment/IMyAssignment";


const columns: IColumnOption[] = [
    { columnName: "Asset Code ", columnValue: "assetCode" },
    { columnName: "Asset Name ", columnValue: "assetName" },
    { columnName: "Category", columnValue: "category" },
    { columnName: "Assigned Date ", columnValue: "assignedDate" },
    { columnName: "State ", columnValue: "state" },
];

type Props = {
    assignments: IPagedModel<IMyAssignment> | null;
    result: IMyAssignment | null;
    handlePage: (page: number) => void;
    handleSort: (colValue: string) => void;
    sortState: SortType;
    handleAccept: Function;
    handleDecline: Function;
    handleReturn: Function;
};

const MyAssignmentTable: React.FC<Props> = ({
    assignments,
    result,
    handlePage,
    handleSort,
    sortState,
    handleAccept = () => { },
    handleDecline = () => { },
    handleReturn = () => { },
}) => {
    const dispatch = useAppDispatch();
    const [showDetail, setShowDetail] = useState(false);
    const [assignmentDetail, setAssignmentDetail] = useState(null as IMyAssignment | null);
    const [confirmState, setConfirmState] = useState({
        isOpen: false,
        title: '',
        message: '',
        isDisable: true,
        button: "",
        cancleButton: "",
        callback: () => { }
    });

    const handleShowInfo = (id: number) => {
        const assignment = result?.id == id ? (result) : (assignments?.items.find((item) => item.id === id));
        if (assignment) {
            setAssignmentDetail(assignment);
            setShowDetail(true);
        }
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
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
                    <tr key={index} className="" onClick={() => handleShowInfo(data.id)}>
                        <td>{data.assetCode}</td>
                        <td>{data.assetName}</td>
                        <td>{data.category}</td>
                        <td>{convertDDMMYYYY(data.assignedDate)}</td>
                        <td>{data.state == "Waiting for returning" ? "Accepted" : data.state}</td>
                        <td className="d-flex">
                            <ButtonIcon disable={data.state == "Accepted" || data.state == "Waiting for returning"} onClick={() => {
                                setConfirmState({
                                    isOpen: true,
                                    title: 'Are you sure?',
                                    message: 'Do you want to accept this assignment?',
                                    isDisable: true,
                                    button: "Accept",
                                    cancleButton: "Cancel",
                                    callback: () => { handleAccept(data.id) }
                                });
                            }}>
                                <CheckLg className="text-danger" />
                            </ButtonIcon>
                            <ButtonIcon disable={data.state == "Accepted" || data.state == "Waiting for returning"} onClick={() => {
                                setConfirmState({
                                    isOpen: true,
                                    title: 'Are you sure?',
                                    message: 'Do you want to decline this assignment?',
                                    isDisable: true,
                                    button: "Decline",
                                    cancleButton: "Cancel",
                                    callback: () => { handleDecline(data.id) }
                                });
                            }}>
                                <XLg className="text-danger mx-2" fill="" />
                            </ButtonIcon>
                            <ButtonIcon disable={data.state == "Waiting for returning" || data.state == "Waiting for acceptance"} onClick={() => {
                                setConfirmState({
                                    isOpen: true,
                                    title: 'Are you sure?',
                                    message: 'Do you want to create a returning request for this asset?',
                                    isDisable: true,
                                    button: "Yes",
                                    cancleButton: "No",
                                    callback: () => { handleReturn(data.id) }
                                });
                            }}>
                                <ArrowCounterclockwise className="text-primary " />
                            </ButtonIcon>
                        </td>
                    </tr>
                ))}
            </Table>
            {assignmentDetail && showDetail && (
                <Info assignment={assignmentDetail} handleClose={handleCloseDetail} />
            )}
            <ConfirmModal
                title={confirmState.title}
                isShow={confirmState.isOpen}
                onHide={() => {
                    setConfirmState({
                        isOpen: false,
                        title: '',
                        message: '',
                        button: "",
                        cancleButton: "",
                        isDisable: true,
                        callback: () => { }
                    })
                }}
            >
                <div>

                    <div className="text-start">
                        {confirmState.message}
                    </div>
                    {
                        confirmState.isDisable && (
                            <div className="text-start mt-3">
                                <button
                                    className="btn btn-danger mr-3"
                                    type="button"
                                    onClick={() => {
                                        setConfirmState({
                                            isOpen: false,
                                            title: '',
                                            message: '',
                                            isDisable: true,
                                            button: "",
                                            cancleButton: "",
                                            callback: () => { }
                                        })
                                        confirmState.callback()
                                    }}
                                >
                                    {confirmState.button}
                                </button>

                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => {
                                        setConfirmState({
                                            isOpen: false,
                                            title: '',
                                            message: '',
                                            button: '',
                                            cancleButton: "",
                                            isDisable: true,
                                            callback: () => { }
                                        })
                                    }}
                                >
                                    {confirmState.cancleButton}
                                </button>
                            </div>
                        )
                    }
                </div>
            </ConfirmModal>
        </>
    );
};

export default MyAssignmentTable;
