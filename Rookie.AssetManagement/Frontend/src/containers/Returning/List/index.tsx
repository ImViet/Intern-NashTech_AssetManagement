import React, { useDebugValue, useEffect, useState, useMemo } from "react";
import { FunnelFill, CalendarDateFill } from "react-bootstrap-icons";
import { Search } from "react-feather";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import ReturningTable from "./ReturningTable";
import ISelectOption from "src/interfaces/ISelectOption";
import { Link, useLocation } from "react-router-dom";
import {
    ACCSENDING,
    DECSENDING,
    DEFAULT_PAGE_LIMIT,
    DEFAULT_ASSIGNMENT_SORT_COLUMN_NAME,
} from "src/constants/paging";
import IPagedModel from "src/interfaces/IPagedModel";
import { cleanUpActionResult, getReturningList, getState, disableReturning } from "../reducer";
import IQueryReturningModel from "src/interfaces/Returning/IQueryReturningModel";
import SelectBox from "src/components/SelectBox";
import { toUTCWithoutHour } from "src/utils/formatDateTime";
import DateFilter from "src/components/DateFilter";

const defaultQuery: IQueryReturningModel = {
    search: "",
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    returnedDate: null,
    sortOrder: ACCSENDING,
    sortColumn: DEFAULT_ASSIGNMENT_SORT_COLUMN_NAME,
    states: [],
}

const defaultSelectedState: ISelectOption[] = [
    { id: 1, label: "All", value: "ALL" }
]

const ListReturning = () => {
    const dispatch = useAppDispatch();
    const { returnings, actionResult } = useAppSelector((state) => state.returingReducer);

    const [query, setQuery] = useState(returnings ? { ...defaultQuery, page: returnings.currentPage } : defaultQuery);

    const [search, setSearch] = useState("");
    const [returnedDate, setReturnedDate] = useState(new Date());
    const [selectedState, setSelectedState] = useState(defaultSelectedState);

    const { FilterReturningStateOptions } = useAppSelector(state => state.returingReducer)
    const states = useMemo(() => {
        
        return FilterReturningStateOptions.filter(state => state.label == "Completed" || state.label == "Waiting for returning" || state.label == "All")
    }, [FilterReturningStateOptions])
    const handleState = (selected: ISelectOption[]) => {
        if (selected.length === 0) {
            setQuery({
                ...query,
                states: ["ALL"],
                page: 1
            });

            setSelectedState([FilterReturningStateOptions[0]]);

            return;
        }

        const selectedAll = selected.find((item) => item.id === 1);

        setSelectedState((prevSelected) => {
            if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
                setQuery({
                    ...query,
                    states: ["ALL"],
                    page: 1
                });

                return [selectedAll];
            }
            const newSelected = selected.filter((item) => item.id !== 1);
            const states = newSelected.map((item) => item.value as string);

            setQuery({
                ...query,
                states,
                page: 1
            });

            return newSelected;
        });
        console.log(query)
    };
    const handleReturnedDateChange = (date: Date) => {
        setQuery({
            ...query,
            returnedDate: toUTCWithoutHour(date)
        });
        setReturnedDate(date);
        console.log(query)
    }
    const handleChangeSearch = (e) => {
        e.preventDefault();

        const search = e.target.value;
        setSearch(search);
        console.log(query)
    };

    const handlePage = (page: number) => {
        setQuery({
            ...query,
            page,
        });
        console.log(query)
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

    // const handleCancel = (id) => {
    //     dispatch(disableReturning({
    //         id: id,
    //         handleResult: (result, message) => {
    //             if (result) {
    //                 setQuery({ ...defaultQuery });
    //             }
    //         }
    //     }))
    //     setSelectedState([FilterReturningStateOptions[0]]);
    // };
    const fetchData = () => {
        dispatch(getReturningList({ ...query }))
    };

    useEffect(() => {
        dispatch(cleanUpActionResult())
        fetchData()
    }, [query]);

    useEffect(() => {
        dispatch(getReturningList({ ...defaultQuery }))
        dispatch(getState())
    }, []);

    return(
        <>
            <div className="primaryColor text-title intro-x ">Request List</div>

            <div>
                <div className="d-flex mb-5 intro-x">
                    <div className="d-flex align-items-center w-md mr-5">
                        <div className="button">
                            <div className="filter-state-assignment">
                                <SelectBox
                                    options={states}
                                    placeholderButtonLabel="State"
                                    value={selectedState}
                                    onChange={handleState} 
                                    currentPage={query.page}
                                    currentSearch={query.search}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center w-md mr-5">
                        <DateFilter label="Returned Date" date={returnedDate} handleDateChange={handleReturnedDateChange} />
                    </div>
                    <div className="search-box d-flex align-items-center w-ld ml-auto mr-2">
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

                    {/* <div className="d-flex align-items-center ml-3">
                        <Link to="/assignment/create" type="button" className="btn btn-danger">
                            Create new assignment
                        </Link>
                    </div> */}
                </div>
                {(() => {
                    if (returnings?.totalItems == 0) {
                        return (
                            <h5 className="not-data-found">No data found</h5>
                        )
                    } else {
                        return (
                            <>
                                <ReturningTable
                                    returnings={returnings}
                                    result={actionResult}
                                    handlePage={handlePage}
                                    handleSort={handleSort}
                                    //handleDisable={handleDisable}
                                    sortState={{
                                        columnValue: query.sortColumn,
                                        orderBy: query.sortOrder,
                                    }}
                                    fetchData={fetchData}                              />
                            </>
                        )
                    }
                })()}
            </div>
        </>
    );
};
export default ListReturning;