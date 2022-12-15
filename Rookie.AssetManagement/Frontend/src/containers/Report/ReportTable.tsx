import React, { useState } from "react";
import { ArrowCounterclockwise, CheckLg, XLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import ButtonIcon from "src/components/ButtonIcon";
import { NotificationManager } from 'react-notifications';

import Table, { SortType } from "src/components/Table";
import IColumnOption from "src/interfaces/IColumnOption";
import IPagedModel from "src/interfaces/IPagedModel";
import formatDateTime, { convertDDMMYYYY } from "src/utils/formatDateTime";
//import Info from "../Info";

// import { EDIT_ASSIGNMENT_ID } from "src/constants/pages";
import ConfirmModal from "src/components/ConfirmModal";
import { useAppDispatch } from "src/hooks/redux";
import IReturning from "src/interfaces/Returning/IReturning";
import { IReport } from "src/interfaces/Report/IReport";


const columns: IColumnOption[] = [
    { columnName: "Category ", columnValue: "category" },
    { columnName: "Total ", columnValue: "total" },
    { columnName: "Assigned ", columnValue: "assigned" },
    { columnName: "Available ", columnValue: "available" },
    { columnName: "Not Available ", columnValue: "notAvailable" },
    { columnName: "Waiting For Recycling ", columnValue: "waitingForRecycling" },
    { columnName: "Recycled ", columnValue: "recycled" },
];

type Props = {
    reports: IReport[] | null;
    handleSort: (colValue: string) => void;
    sortState: SortType;
};

const ReportTable: React.FC<Props> = ({
    reports,
    handleSort,
    sortState,
}) => {
    return (
        <div className="report-table">
            <Table
                columns={columns}
                handleSort={handleSort}
                sortState={sortState}
            >
                {reports?.map((report, index) => (
                    <tr key={index} className="">
                        <td>{report.category}</td>
                        <td>{report.total}</td>
                        <td>{report.assigned}</td>
                        <td>{report.available}</td>
                        <td>{report.notAvailable}</td>
                        <td>{report.waitingForRecycling}</td>
                        <td>{report.recycled}</td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};

export default ReportTable;