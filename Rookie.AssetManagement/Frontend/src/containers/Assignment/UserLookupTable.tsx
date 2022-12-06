import React, { useState } from "react";
import IColumnOption from "src/interfaces/IColumnOption";
import { useAppDispatch } from "src/hooks/redux";
import IAsset from "src/interfaces/Asset/IAsset";
import HistoryTableAsset from "src/components/Table/HistoryTableAsset";
import IAssetHistory from "src/interfaces/Asset/IAssetHistory";


const columns: IColumnOption[] = [
    { columnName: "", columnValue: "checkbox" },
    { columnName: "Staff Code", columnValue: "staffcode" },
    { columnName: "Full Name", columnValue: "fullname" },
    { columnName: "Type", columnValue: "type" },
];

type Props = {
    assetHistory: IAssetHistory[] | null;
    result: IAssetHistory | null;
    fetchData: Function;
};

const UserLookupTable: React.FC<Props> = ({
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
                        <td>{data.staffcode}</td>
                        <td>{data.fullname}</td>
                        <td>{data.type}</td>
                    </tr>

                ))} */}
                <tr  >
                    <input className="form-check-input input-radio"
                        id = "1"
                        type="radio"
                    />
                    <td>SD1901</td>
                    <td>An Nguyen Thuy</td>
                    <td>Staff</td>
                </tr>
                <tr >
                    <input className="form-check-input input-radio"
                        id = "1"
                        type="radio"
                    />
                    <td>SD1234</td>
                    <td>An Tran Van</td>
                    <td>Admin</td>
                </tr>
            </HistoryTableAsset>
        </>
    );
};

export default UserLookupTable;
