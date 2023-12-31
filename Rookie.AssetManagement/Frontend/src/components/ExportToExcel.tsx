import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportToExcel = ({ apiData, fileName }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        XLSX.utils.sheet_add_aoa(ws,
            [["Category", "Total", "Assigned", "Available",
                "Not Available", "Waiting For Recycling", "Recycled"]], { origin: "A1" });
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    //<ExportToExcel apiData={data} fileName={fileName} />
    //    const fileName = "assignment"; // here enter filename for your excel file
    return (
        <div className="d-flex align-items-center justify-content-end ml-3">
            <button className="btn btn-danger" onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
        </div>
    );
};