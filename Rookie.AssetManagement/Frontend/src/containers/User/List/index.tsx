import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import UserTable from "./UserTable";
import IUserForm from "src/interfaces/User/IUserForm";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import ISelectOption from "src/interfaces/ISelectOption";
import { Link, useLocation } from "react-router-dom";
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_PAGE_LIMIT,
  DEFAULT_USER_SORT_COLUMN_NAME,
} from "src/constants/paging";
import { FilterUserTypeOptions } from "src/constants/selectOptions";
import { getUserList, disableUser, cleanUpUserActionResult } from "../reducer";
import SelectBox from "src/components/SelectBox";
import SearchBox from "src/components/SearchBox";
import { getSearchUserSuggestion } from "../sagas/requests";

const defaultQuery: IQueryUserModel = {
  page: 1,
  limit: DEFAULT_PAGE_LIMIT,
  sortOrder: ACCSENDING,
  sortColumn: DEFAULT_USER_SORT_COLUMN_NAME,
  types: [],
  search: ""
}

const defaultSelectedType: ISelectOption[] = [
  { id: 1, label: "Type", value: "ALL" },
] as ISelectOption[]

const ListUser = () => {
  const dispatch = useAppDispatch();

  const { users, actionResult } = useAppSelector((state) => state.userReducer);

  const [query, setQuery] = useState(users ? { ...defaultQuery, page: users.currentPage } : defaultQuery);

  const [selectedType, setSelectedType] = useState(defaultSelectedType);

  const handleType = (selected: ISelectOption[]) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        types: ["ALL"],
      });

      setSelectedType([FilterUserTypeOptions[0]]);

      return;
    }

    const selectedAll = selected.find((item) => item.id === 1);

    setSelectedType((prevSelected) => {
      if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
        setQuery({
          ...query,
          types: ["ALL"],
        });

        return [selectedAll];
      }

      const newSelected = selected.filter((item) => item.id !== 1);
      const types = newSelected.map((item) => item.value as string);

      setQuery({
        ...query,
        page: 1,
        types,
      });

      return newSelected;
    });
    console.log(query)
  };

  const handlePage = (page: number) => {
    setQuery({
      ...query,
      page,
    });
    console.log(query)
  };

  const handleSearch = (keyword) => {
    setQuery({
      ...query,
      search: keyword,
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

  const handleDisable = (id) => {
    dispatch(disableUser({
      id: id,
      handleResult: (result, message) => {
        if (result) {
          setQuery({ ...defaultQuery });
        }
      }
    }))
    setSelectedType(defaultSelectedType);
  };

  const fetchData = () => {
    dispatch(getUserList(query))
  };

  useEffect(() => {
    dispatch(cleanUpUserActionResult());
    fetchData();
  }, [query]);

  useEffect(() => {
    dispatch(getUserList({ ...defaultQuery }))
  }, []);

  return (
    <>
      <div className="primaryColor text-title intro-x ">User List</div>

      <div>
        <div className="d-flex mb-5 intro-x">
          <div className="filter-type">
            <SelectBox
              currentPage={query.page}
              currentSearch={query.search}
              options={FilterUserTypeOptions}
              placeholderButtonLabel="Type"
              value={selectedType}
              onChange={handleType} />
          </div>

          <SearchBox handleSearch={handleSearch} getSuggestionRequest={getSearchUserSuggestion} />

          <div className="d-flex align-items-center ml-3">
            <Link to="/user/create" type="button" className="btn btn-danger">
              Create new user
            </Link>
          </div>
        </div>
        {(() => {
          if (users?.totalItems == 0) {
            return (
              <h5 className="not-data-found">No data found</h5>
            )
          } else {
            return (
              <>
                <UserTable
                  users={users}
                  result={actionResult}
                  handlePage={handlePage}
                  handleSort={handleSort}
                  handleDisable={handleDisable}
                  sortState={{
                    columnValue: query.sortColumn,
                    orderBy: query.sortOrder,
                  }}
                  fetchData={fetchData}
                />
              </>)
          }
        })()}
      </div>
    </>
  );
};

export default ListUser;
