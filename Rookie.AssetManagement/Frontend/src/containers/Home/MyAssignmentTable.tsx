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


const columns: IColumnOption[] = [
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
    sortState: SortType;
};

const MyAssignmentTable: React.FC<Props> = ({
    assignments,
    result,
    handlePage,
    handleSort,
    sortState,
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
        // const assignment = result?.id == id ? (result) : (assignments?.items.find((item) => item.id === id));
        // if (assignment) {
        //     setAssignmentDetail(assignment);
        //     setShowDetail(true);
        // }
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
                        <td>{data.state}</td>
                        <td className="d-flex">
                            <ButtonIcon disable={data.state == "Accepted"}>
                                <CheckLg className="text-danger" />
                            </ButtonIcon>
                            <ButtonIcon disable={data.state == "Accepted"}>
                                <XLg className="text-danger mx-2" />
                            </ButtonIcon>
                            <ButtonIcon disable={data.state == "Accepted"}>
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
                title={disableState.title}
                isShow={disableState.isOpen}
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
                                >
                                    Delete
                                </button>

                                <button
                                    className="btn btn-outline-secondary"
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

export default MyAssignmentTable;
