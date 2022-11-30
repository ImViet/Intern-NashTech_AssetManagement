import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import { Search } from "react-feather";
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
  DEFAULT_USER_SORT_COLUMN_NAME,
} from "src/constants/paging";
import { FilterUserTypeOptions } from "src/constants/selectOptions";
import { getUserList, disableUser } from "../reducer";
import { DefaultLimit } from "src/constants/User/UserContants";
import SelectBox from "src/components/SelectBox";


const ListUser = () => {
  const dispatch = useAppDispatch();
  const { users, actionResult } = useAppSelector((state) => state.userReducer);

  const [query, setQuery] = useState({
    page: users?.currentPage ?? 1,
    limit: DefaultLimit,
    sortOrder: ACCSENDING,
    sortColumn: DEFAULT_USER_SORT_COLUMN_NAME,
  } as IQueryUserModel);

  const [search, setSearch] = useState("");

  const [selectedType, setSelectedType] = useState([
    { id: 1, label: "Type", value: "ALL" },
  ] as ISelectOption[]);

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
    const sortOrder = query.sortOrder === ACCSENDING ? DECSENDING : ACCSENDING;
    setQuery({
      ...query,
      sortColumn,
      sortOrder,
    });
  };

  const fetchData = () => {
    dispatch(getUserList(query))
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleDisable = (id) => {
    dispatch(disableUser({
      id: id,
      handleResult: (result, message) => {
        if (result) {
          setQuery({
            ...query,
            page: 1,
            limit: DefaultLimit,
            sortOrder: DECSENDING,
            sortColumn: DEFAULT_USER_SORT_COLUMN_NAME,
          });
        }
      }
    }))
  };

  return (
    <>
      <div className="primaryColor text-title intro-x ">User List</div>

      <div>
        <div className="d-flex mb-5 intro-x">
         <div className="filter-type">
          <SelectBox               
              options={FilterUserTypeOptions}
              placeholderButtonLabel="Type"
              value={selectedType}
              onChange={handleType}/>
         </div>

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

          <div className="d-flex align-items-center ml-3">
            <Link to="/user/create" type="button" className="btn btn-danger">
              Create new User
            </Link>
          </div>
        </div>

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
      </div>
    </>
  );
};

export default ListUser;
