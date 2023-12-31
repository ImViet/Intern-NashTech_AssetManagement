import React, { useEffect, useState } from "react";
import IColumnOption from "src/interfaces/IColumnOption";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import IAsset from "src/interfaces/Asset/IAsset";
import HistoryTableAsset from "src/containers/Asset/HistoryTableAsset";
import IAssetHistory from "src/interfaces/Asset/IAssetHistory";
import IPagedModel from "src/interfaces/IPagedModel";
import IUser from "src/interfaces/User/IUser";
import Table, { SortType } from "src/components/Table";
import ILookupTable from "src/interfaces/ILookupTable";
import { Search } from "react-bootstrap-icons";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import { ACCSENDING, DECSENDING, DEFAULT_PAGE_LIMIT, DEFAULT_USER_SORT_COLUMN_NAME } from "src/constants/paging";

const columns: IColumnOption[] = [
    { columnName: "", columnValue: "checkbox" },
    { columnName: "Staff Code ", columnValue: "staffCode" },
    { columnName: "Full Name ", columnValue: "fullName" },
    { columnName: "Type ", columnValue: "Type" },
];

const defaultQuery: IQueryUserModel = {
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    sortOrder: ACCSENDING,
    sortColumn: DEFAULT_USER_SORT_COLUMN_NAME,
    types: [],
    search: ""
}


const UserLookupTable: React.FC<ILookupTable> = ({
    onSelect,
    closeModal,
    requestData,
}) => {
    const [selected, setSelected] = useState({label:"", value: 0});
    const [users, setUsers]= useState({} as IPagedModel<IUser>);
    const [query, setQuery] = useState({ ...defaultQuery });
    const [search, setSearch] = useState("");
    const [disable, setDisable] = useState(true);

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
            .then(res=>setUsers(res.data))
            .catch(err=>console.log(err));
    }
    
    useEffect(() => {
        fetchData();
    }, [query]);

    const handleClick = (data) =>{
        setSelected({label: data.fullName, value: data.id})
        setDisable(false)
    }

    return (
        <>
            <div className="header-table">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 style={{
                        color: "#cf2338",
                        margin: 0,
                    }}>Select User</h5>
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
                    <div className="table-user">
                        <Table
                            columns={columns}
                            handleSort={handleSort}
                            sortState={{
                                columnValue: query.sortColumn,
                                orderBy: query.sortOrder,
                            }}
                            page={{
                                currentPage: users?.currentPage,
                                totalPage: users?.totalPages,
                                handleChange: handlePage,
                            }}
                        >
                            {users?.items?.map((data, index) => (
                                <tr key={index} className="">
                                    <input className="form-check-input input-radio ml-1"
                                        type="radio"
                                        name="user-select"
                                        checked={data.id == selected.value}
                                        onClick={()=>handleClick(data)}
                                    />
                                    <td>{data.staffCode}</td>
                                    <td>{data.fullName}</td>
                                    <td>{data.type}</td>
                                </tr>
                            ))}
                        </Table>

                    </div>
                </div>
            </div>
            <div className="d-flex mt-3 mr-2">
                <div className="ml-auto">
                    <button className="btn btn-danger mr-4"
                        type="submit" disabled={disable}
                        onClick={()=>{onSelect(selected.label, selected.value); closeModal();}}
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

export default UserLookupTable;
