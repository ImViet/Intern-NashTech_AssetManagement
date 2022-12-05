import React, { useState } from "react";
import IColumnOption from "src/interfaces/IColumnOption";
import { useAppDispatch } from "src/hooks/redux";
import IAsset from "src/interfaces/Asset/IAsset";
import HistoryTableAsset from "src/components/Table/HistoryTableAsset";
import IAssetHistory from "src/interfaces/Asset/IAssetHistory";


const columns: IColumnOption[] = [
    { columnName: "Date ", columnValue: "date" },
    { columnName: "Assigned to", columnValue: "assignedTo" },
    { columnName: "Assigned by ", columnValue: "AssignedBy" },
    { columnName: "Return Date ", columnValue: "returnDate" },
];

type Props = {
    assetHistory: IAssetHistory[] | null;
    result: IAssetHistory | null;
    fetchData: Function;
};

const AssetDetailTable: React.FC<Props> = ({
    assetHistory,
    result,
    fetchData,
}) => {
    const dispatch = useAppDispatch();
    let rows
    if (result && assetHistory) {
        rows = [...assetHistory];
    }
    return (
        <>
            <HistoryTableAsset
                columns={columns}
            >
                {/* {rows?.map((data, index) => (
                    <tr key={index} className="" >
                        <td>{data.assetCode}</td>
                        <td>{data.assetName}</td>
                        <td>{data.category}</td>
                        <td>{data.state}</td>
                    </tr>

                ))} */}
                <tr  >
                    <td>12/10/2018</td>
                    <td>hungtv1</td>
                    <td>binhnv</td>
                    <td>07/03/2019</td>
                </tr>
                <tr >
                    <td>10/03/2019</td>
                    <td>thinhptx</td>
                    <td>tuanha</td>
                    <td>22/03/2020</td>
                </tr>
            </HistoryTableAsset>
        </>
    );
};

export default AssetDetailTable;
