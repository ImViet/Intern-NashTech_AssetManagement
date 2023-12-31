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
import { acceptAssignment, cleanUpActionResult, declineAssignment, getMyAssignmentList, returnAssignment } from "./reducer";

const defaultQuery = {
  page: 1,
  sortOrder: DECSENDING,
  limit: 5,
  sortColumn: DEFAULT_USER_SORT_COLUMN_NAME,
} as IQueryMyAssignmentModel

const Home = () => {
  const { assignments, actionResult } = useAppSelector((state) => state.myAssignmentReducer);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState({ ...defaultQuery });

  const handlePage = (page: number) => {
    setQuery({
      ...query,
      page,
    });
    console.log(query)
  };

  const handleAccept = (id: number) => {
    dispatch(acceptAssignment({
      id: id,
      handleResult: () => {
        dispatch(getMyAssignmentList({ ...defaultQuery }))
      }
    }));
  }

  const handleDecline = (id: number) => {
    dispatch(declineAssignment({
      id: id,
      handleResult: () => {
        dispatch(getMyAssignmentList({ ...defaultQuery }))
      }
    }));
  }

  const handleReturn = (id: number) => {
    const assignment = assignments?.items.find(i => i.id == id);
    if (!assignment) {
      return
    }
    dispatch(returnAssignment({
      id: id,
      assignment: assignment,
      handleResult: () => {
        dispatch(getMyAssignmentList({ ...defaultQuery }))
      }
    }));
  }

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

  useEffect(() => {
    dispatch(cleanUpActionResult())
    dispatch(getMyAssignmentList({ ...query }))
  }, [query]);

  return (
    <>
      <div className='primaryColor text-title intro-x'>
        My Assignment
      </div>
      <div>
        {assignments?.totalItems == 0 ? (
          <h5 className="not-data-found">No assignment found</h5>
        ) : (
          <>
            <MyAssignmentTable
              handlePage={handlePage}
              handleSort={handleSort}
              sortState={{
                columnValue: query.sortColumn,
                orderBy: query.sortOrder,
              }}
              assignments={assignments}
              result={actionResult}
              handleAccept={handleAccept}
              handleDecline={handleDecline}
              handleReturn={handleReturn}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
