import React from "react";
import IColumnOption from "src/interfaces/IColumnOption";
type Props = {
    columns: IColumnOption[];
    children: React.ReactNode;
};

const HistoryTableAsset: React.FC<Props> = ({ columns, children }) => {

    return (
        <>
            <div className="table-container-history">
                <table className="table-history">
                    <thead>
                        <tr>
                            {
                                columns.map((col, i) => (
                                    <th key={i}>
                                        <a className="btn" style={{ paddingLeft: 0, paddingBottom: 0 }}>
                                            {col.columnName}
                                        </a>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default HistoryTableAsset;
