import React, { useState } from "react";
import { ArrowCounterclockwise, PencilFill, XCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import ButtonIcon from "src/components/ButtonIcon";
import { NotificationManager } from 'react-notifications';

import Table, { SortType } from "src/components/Table";
import IColumnOption from "src/interfaces/IColumnOption";
import IPagedModel from "src/interfaces/IPagedModel";
import formatDateTime, { convertDDMMYYYY } from "src/utils/formatDateTime";
import Info from "../Info";
//import { disableUser } from "../reducer";

import { EDIT_ASSIGNMENT_ID } from "src/constants/pages";
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
    const [assignmentDetail, setAssignmentDetail] = useState(null as IAssignment | null);
    const [disableState, setDisable] = useState({
        isOpen: false,
        id: 0,
        title: '',
        message: '',
        isDisable: true,
    });

    const handleShowInfo = (id: number) => {
        const assignment = result?.id == id ? (result) : (assignments?.items.find((item) => item.id === id));
        if (assignment) {
            setAssignmentDetail(assignment);
            setShowDetail(true);
        }
    };

    const handleShowDisable = async (id: number) => {
        setDisable({
            id,
            isOpen: true,
            title: 'Are you sure?',
            message: 'Do you want to delete this assignment?',
            isDisable: true,
        });
    };

    const handleCloseDisable = () => {
        setDisable({
            isOpen: false,
            id: 0,
            title: '',
            message: '',
            isDisable: true,
        });
    };

    const onDisable = () => {
        handleDisable(disableState.id)
        setDisable({
            isOpen: false,
            id: 0,
            title: '',
            message: '',
            isDisable: true,
        });
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
    };

    const navigate = useNavigate();
    const handleEdit = (id: number) => {
        navigate(EDIT_ASSIGNMENT_ID(id));
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
                        <td>{result ? index + 1 : data.no}</td>
                        <td>{data.assetCode}</td>
                        <td>{data.assetName}</td>
                        <td>{data.assignedTo}</td>
                        <td>{data.assignedBy}</td>
                        <td>{convertDDMMYYYY(data.assignedDate)}</td>
                        <td>{data.state}</td>
                        <td className="d-flex cvg-custom">
                            <ButtonIcon disable={data.state == "Accepted"} onClick={() => handleEdit(data.id)}>
                                <PencilFill className="text-black" />
                            </ButtonIcon>
                            <ButtonIcon disable={data.state == "Accepted"} onClick={() => handleShowDisable(data.id)}>
                                <XCircle className="text-danger mx-2" />
                            </ButtonIcon>
                            <ButtonIcon >
                                {(data.state == "Accepted") ?
                                    <ArrowCounterclockwise className="text-primary arrowccw-svg" /> :
                                    <ArrowCounterclockwise fill="" className="text-primary arrowccw-disable-svg" />}
                            </ButtonIcon>
                        </td>
                    </tr>
                ))}
            </Table>
            {assignmentDetail && showDetail && (
                <Info assignment={assignmentDetail} handleClose={handleCloseDetail} />
            )}
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
