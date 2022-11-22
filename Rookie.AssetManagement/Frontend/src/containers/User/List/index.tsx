import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import { Search } from "react-feather";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import UserTable from "./UserTable";
import IUserForm from "src/interfaces/User/IUserForm";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import ISelectOption from "src/interfaces/ISelectOption";
import { Link } from "react-router-dom";
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_USER_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT,
} from "src/constants/paging";
import { FilterUserTypeOptions } from "src/constants/selectOptions";
import IUser from "src/interfaces/User/IUser";
import IPagedModel from "src/interfaces/IPagedModel";

const ListUser = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.userReducer);

  const [query, setQuery] = useState({
    page: users?.currentPage ?? 1,
    orderBy: DECSENDING,
    orderByColumn: DEFAULT_USER_SORT_COLUMN_NAME,
  } as IQueryUserModel);

  const [search, setSearch] = useState("");

  const [selectedType, setSelectedType] = useState([
    { id: 1, label: "Type", value: "all" },
  ] as ISelectOption[]);

  const handleType = (selected: ISelectOption[]) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        types: [],
      });

      setSelectedType([FilterUserTypeOptions[0]]);
      return;
    }

    const selectedAll = selected.find((item) => item.id === 1);

    setSelectedType((prevSelected) => {
      if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
        setQuery({
          ...query,
          types: [],
        });

        return [selectedAll];
      }

      const newSelected = selected.filter((item) => item.id !== 1);
      const types = newSelected.map((item) => item.value as string);

      setQuery({
        ...query,
        types,
      });

      return newSelected;
    });
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();

    const search = e.target.value;
    setSearch(search);
  };

  const handlePage = (page: number) => {
    setQuery({
      ...query,
      page,
    });
  };

  const handleSearch = () => {
    setQuery({
      ...query,
      search,
    });
  };

  const handleSort = (orderByColumn: string) => {
    const orderBy = query.orderBy === ACCSENDING ? DECSENDING : ACCSENDING;

    setQuery({
      ...query,
      orderByColumn,
      orderBy,
    });
  };

  const fetchData = () => {

  };

  useEffect(() => {
    fetchData();
  }, [query]);


  return (
    <>
      <div className="primaryColor text-title intro-x">User List</div>

      <div>
        <div className="d-flex mb-5 intro-x">
          <div className="d-flex align-items-center w-md mr-5">
            <ReactMultiSelectCheckboxes
              options={FilterUserTypeOptions}
              hideSearch={true}
              placeholderButtonLabel="Type"
              value={selectedType}
              onChange={handleType}
            />
            <div className="border p-2">
              <FunnelFill />
            </div>
          </div>

          <div className="d-flex align-items-center w-ld ml-auto">
            <div className="input-group">
              <input
                onChange={handleChangeSearch}
                value={search}
                type="text"
                className="form-control"
              />
              <span onClick={handleSearch} className="border p-2 pointer">
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
          handlePage={handlePage}
          handleSort={handleSort}
          sortState={{
            columnValue: query.orderByColumn,
            orderBy: query.orderBy,
          }}
          fetchData={fetchData}
        />
      </div>
    </>
  );
};

export default ListUser;
