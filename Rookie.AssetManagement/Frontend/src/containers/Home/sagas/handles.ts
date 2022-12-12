import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import IQueryMyAssignmentModel from "src/interfaces/Assignment/IQueryMyAssignmentModel";
import { setActionResult, setMyAssignmentList, setStatus } from "../reducer";
import { acceptAssignmentRequest, getMyAssignmentsRequest } from "./requests";

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

export function* handleAccept(
  action: PayloadAction<number>
){
  const assignmentId = action.payload;
  try {
    console.log(assignmentId);

    const { data } = yield call(acceptAssignmentRequest, assignmentId);
    yield put(setActionResult(data));
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
