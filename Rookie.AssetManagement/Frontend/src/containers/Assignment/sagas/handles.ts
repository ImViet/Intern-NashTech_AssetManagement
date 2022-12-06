import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import {
//   setAssetFormData,
  setState,
  setStatus,
} from "src/containers/Assignment/reducer";
import IError from "src/interfaces/IError";
import IQueryAssignmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";
import ISelectOption from "src/interfaces/ISelectOption";
import { toUTC } from "src/utils/formatDateTime";
import {
  setAssignmentList,
  CreateAction,
  UpdateAction,
  setAssignmentResult,
  setActionResult,
  DisableAction,
} from "../reducer";
import {
  getStateRequest,
  getAssignmentsRequest,
  getAssignmentByIdRequest,
} from "./requests";

export function* handleGetAssignmentList(action: PayloadAction<IQueryAssignmentModel>) {
  const queryAssigmentModel = action.payload;

  try {
    console.log(queryAssigmentModel);
    const { data } = yield call(getAssignmentsRequest, queryAssigmentModel);
    yield put(setAssignmentList(data));
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

export function* handleGetStateList() {
  try {
    const { data } = yield call(getStateRequest);
    const options = [
      {
        id: 1,
        label: "ALL",
        value: "ALL",
      },
    ];
    data.forEach((state, index) => {
      options.push({
        id: index + 2,
        label: state.stateName,
        value: state.id,
      });
    });
    yield put(setState(options));
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

export function* handleGetAssignmentById(action: PayloadAction<number>) {
  const id = action.payload;

  try {
    const { data } = yield call(getAssignmentByIdRequest, id);
    data.InstalledDate = new Date(data.InstalledDate);
    yield put(setAssignmentResult(data));
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