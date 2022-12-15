import React, { useEffect, useState } from "react";
import { IReport } from "src/interfaces/Report/IReport";
import ReportTable from "./ReportTable";
import RequestService from "../../services/request";
import EndPoints from "../../constants/endpoints"

const Report = () => {
    const [reports, setReports] = useState([] as IReport[]);
    const [sort, setSort] = useState({
        columnValue: "",
        orderBy: ""
    });

    useEffect(() => {
        RequestService.axios.get(EndPoints.report)
            .then(res => {
                setReports(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSort = () => {

    }

    return (
        <>
            <div className="primaryColor text-title intro-x ">Report</div>
            <div>
                <div className="d-flex align-items-center justify-content-end ml-3">
                    <button type="button" className="btn btn-danger">
                        Export
                    </button>
                </div>
            </div>
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
