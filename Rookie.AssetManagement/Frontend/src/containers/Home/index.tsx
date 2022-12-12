import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "src/constants/pages";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { me } from "../Authorize/reducer";
import {
  ACCSENDING,
  DECSENDING,
  DEFAULT_USER_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT,
} from "src/constants/paging";
import MyAssignmentTable from "./MyAssignmentTable";
import IQueryMyAssignmentModel from "src/interfaces/Assignment/IQueryMyAssignmentModel";
import { getMyAssignmentList } from "./reducer";

const Home = () => {
  const { assignments } = useAppSelector((state) => state.myAssignmentReducer);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState({
    page: assignments?.currentPage ?? 1,
    sortOrder: DECSENDING,
    sortColumn: DEFAULT_USER_SORT_COLUMN_NAME,
  } as IQueryMyAssignmentModel);

  const handlePage = (page: number) => {
    setQuery({
      ...query,
      page,
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

  const fetchData = () => {
    dispatch(getMyAssignmentList({ ...query }))
  };

  // useEffect(() => {
  //   if (isAuth) {
  //     dispatch(me());
  //   } else {
  //     navigate(LOGIN)
  //   }
  // }, [isAuth]);

  useEffect(() => {
    fetchData()
  }, [query]);

  return (
    <>
      <div className='primaryColor text-title intro-x'>
        My Assignment
      </div>
      <div>
        <MyAssignmentTable
          handlePage={handlePage}
          handleSort={handleSort}
          sortState={{
            columnValue: query.sortColumn,
            orderBy: query.sortOrder,
          }}
          assignments={assignments}
          result={null}
          handleAccept={(id) => { console.log("Accept:", id) }} />
      </div>
    </>
  );
};

export default Home;
