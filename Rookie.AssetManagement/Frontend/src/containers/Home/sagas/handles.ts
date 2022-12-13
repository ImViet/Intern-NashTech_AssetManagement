import { ReturnAction } from './../reducer';
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import IQueryMyAssignmentModel from "src/interfaces/Assignment/IQueryMyAssignmentModel";
import {
  AcceptAction,
  DeclineAction,
  setActionResult,
  setMyAssignmentList,
  setStatus,
} from "../reducer";
import {
  acceptAssignmentRequest,
  declineAssignmentRequest,
  getMyAssignmentsRequest,
  returnAssignmentRequest,
} from "./requests";

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

export function* handleAccept(action: PayloadAction<AcceptAction>) {
  const { id, handleResult } = action.payload;
  try {
    console.log(id);

    const { data } = yield call(acceptAssignmentRequest, id);
    handleResult();
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

export function* handleDecline(action: PayloadAction<DeclineAction>) {
  const { id, handleResult } = action.payload;
  try {
    console.log(id);

    const { data } = yield call(declineAssignmentRequest, id);
    handleResult();
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

export function* handleReturn(action: PayloadAction<ReturnAction>) {
  const { id, handleResult } = action.payload;
  try {
    console.log(id);

    const { data } = yield call(returnAssignmentRequest, id);
    handleResult();
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

