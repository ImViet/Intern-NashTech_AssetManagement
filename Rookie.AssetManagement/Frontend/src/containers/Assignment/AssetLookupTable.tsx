import React, { useEffect, useState } from "react";
import IColumnOption from "src/interfaces/IColumnOption";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import IAsset from "src/interfaces/Asset/IAsset";
import IPagedModel from "src/interfaces/IPagedModel";
import Table, { SortType } from "src/components/Table";
import ILookupTable from "src/interfaces/ILookupTable";
import { Search } from "react-bootstrap-icons";
import { ACCSENDING, DECSENDING, DEFAULT_PAGE_LIMIT, DEFAULT_ASSET_SORT_COLUMN_NAME } from "src/constants/paging";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";

const columns: IColumnOption[] = [
    { columnName: "", columnValue: "checkbox" },
    { columnName: "Asset Code ", columnValue: "assetCode" },
    { columnName: "Asset Name ", columnValue: "assetName" },
    { columnName: "Category ", columnValue: "category" },
];

const defaultQuery: IQueryAssetModel = {
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    sortOrder: ACCSENDING,
    sortColumn: DEFAULT_ASSET_SORT_COLUMN_NAME,
    categories: ["All"],
    states: ["All"],
    search: ""
}


const AssetLookupTable: React.FC<ILookupTable> = ({
    onSelect,
    closeModal,
    requestData,
}) => {
    const [assets, setAssets]= useState({} as IPagedModel<IAsset>);
    const [query, setQuery] = useState({ ...defaultQuery });
    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");
    const [id, setId] = useState(1);
    // const []

    const handlePage = (page: number) => {
        setQuery({
            ...query,
            page,
        });
        console.log(query)
    };

    const handleChangeSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    };

    const handleSearch = () => {
        setQuery({
          ...query,
          search,
          page: 1
        });
        console.log(query)
    };

    const handleSort = (sortColumn: string) => {
        let sortOrder
        if (query.sortColumn != sortColumn) {
            sortOrder = ACCSENDING
        } else {
            sortOrder = query.sortOrder === ACCSENDING ? DECSENDING : ACCSENDING;
        }
        setQuery({
            ...query,
            sortColumn,
            sortOrder,
        });
    };

    const fetchData=()=>{
        requestData(query)
            .then(res=>setAssets(res.data))
            .catch(err=>console.log(err));
    }
    
    useEffect(() => {
        fetchData();
    }, [query]);

    const handleChange = (e) => {
        console.log(e.target)
        setValue(e.target.value)
        setId(e.target.id)
    };

    const handleChangeName = () =>{
        onSelect(id.toString(),value)
        closeModal()
    }


    return (
        <>
            <div className="header-table">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 style={{
                        color: "#cf2338",
                        margin: 0,
                    }}>Select Asset</h5>
                    <div className="d-flex align-items-center w-ld ml-auto mr-2">
                        <div className="input-group">
                            <input
                                onChange={handleChangeSearch}
                                value={search}
                                type="text"
                                className="input-search  form-control"
                            />
                            <span onClick={handleSearch} className=" search-icon p-1 pointer">
                                <Search />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-detail">
                <div className='row -intro-y'>
                    <div className="table-asset">
                        <Table
                            columns={columns}
                            handleSort={handleSort}
                            sortState={{
                                columnValue: query.sortColumn,
                                orderBy: query.sortOrder,
                            }}
                        >
                            {assets?.items?.map((data, index) => (
                                <tr key={index} className="">
                                    <input className="form-check-input input-radio ml-1"
                                    id={data.id.toString()}
                                    type="radio"
                                    value={data.assetName}
                                    onChange={handleChange}
                                    checked={data.assetName == value}
                                    />
                                    <td>{data.assetCode}</td>
                                    <td>{data.assetName}</td>
                                    <td>{data.category}</td>
                                </tr>
                            ))}
                        </Table>

                    </div>
                </div>
            </div>
            <div className="d-flex mt-3 mr-2">
                <div className="ml-auto">
                    <button className="btn btn-danger mr-4"
                        type="submit" disabled={false}
                        onClick={() => handleChangeName()}
                    >
                        Save
                    </button>

                    <button onClick={() => closeModal()} className="btn btn-outline-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default AssetLookupTable;
