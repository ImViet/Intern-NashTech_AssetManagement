import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "src/constants/pages";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { me } from "../Authorize/reducer";
import HomeTable from "./HomeTable";
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_USER_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT,
} from "src/constants/paging";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";

const Home = () => {
  const { isAuth, account } = useAppSelector((state) => state.authReducer);
  const { users, loading } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlePage = (page: number) => {
    setQuery({
      ...query,
      page,
    });
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

  };

  const [query, setQuery] = useState({
    page: users?.currentPage ?? 1,
    sortOrder: DECSENDING,
    sortColumn: DEFAULT_USER_SORT_COLUMN_NAME,
  } as IQueryUserModel);

  useEffect(() => {
    if (isAuth) {
      dispatch(me());
    } else {
      navigate(LOGIN)
    }
  }, [isAuth]);

  return (
    <>
      <div className='primaryColor text-title intro-x'>
        My Assignment
      </div>
      <div>
        <HomeTable

          handlePage={handlePage}
          handleSort={handleSort}
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

export default Home;
