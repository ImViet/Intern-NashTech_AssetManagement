import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import IQueryMyAssignmentModel from "src/interfaces/Assignment/IQueryMyAssignmentModel";
import { setMyAssignmentList, setStatus } from "../reducer";
import { getMyAssignmentsRequest } from "./requests";

export function* handleGetMyAssignmentList(
  action: PayloadAction<IQueryMyAssignmentModel>
) {
  const queryMyAssigmentModel = action.payload;

  try {
    console.log(queryMyAssigmentModel);

    const { data } = yield call(getMyAssignmentsRequest, queryMyAssigmentModel);
    yield put(setMyAssignmentList(data));
  } catch (error: any) {
    const message = error.response.data;
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: message,
        },
      })
    );
  }
}
