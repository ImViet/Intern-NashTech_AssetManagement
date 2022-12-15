import React, { useEffect, useState } from "react";
import { IReport } from "src/interfaces/Report/IReport";
import ReportTable from "./ReportTable";
import RequestService from "../../services/request";
import EndPoints from "../../constants/endpoints"
import { ACCSENDING, DECSENDING, DEFAULT_REPORT_SORT_COLUMN_NAME } from "src/constants/paging";
import { ExportToExcel } from "src/components/ExportToExcel";

const Report = () => {
    const [reports, setReports] = useState([] as IReport[]);
    const [sort, setSort] = useState({
        columnValue: DEFAULT_REPORT_SORT_COLUMN_NAME,
        orderBy: ACCSENDING
    });
    const fileName = "report"; // here enter filename for your excel file
    useEffect(() => {
        RequestService.axios.get(EndPoints.report)
            .then(res => {
                setReports(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSort = (sortColumn: string) => {
        let sortOrder
        if (sort.columnValue != sortColumn) {
            sortOrder = ACCSENDING
        } else {
            sortOrder = sort.orderBy === ACCSENDING ? DECSENDING : ACCSENDING;
        }

        setSort({
            columnValue: sortColumn,
            orderBy: sortOrder
        })

        setReports(val => val.sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) {
                return sortOrder == ACCSENDING ? 1 : -1;
            }
            if (a[sortColumn] > b[sortColumn]) {
                return sortOrder == ACCSENDING ? -1 : 1;
            }
            return 0;
        }))
    };

    return (
        <>
            <div className="primaryColor text-title intro-x ">Report</div>

            <ExportToExcel apiData={reports} fileName={fileName} />
            {reports.length == 0 ? (
                <h5 className="not-data-found">No data found</h5>
            ) : (
                <>
                    <ReportTable
                        reports={reports}
                        handleSort={handleSort}
                        sortState={sort}
                    />
                </>
            )}
        </>
    );
};

export default Report;
