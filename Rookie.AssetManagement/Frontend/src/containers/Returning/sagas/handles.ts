import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import {
  //   setAssetFormData,
  setState,
  setStatus,
  setReturningList,
  CompleteAction,
  CancelAction,
} from "src/containers/Returning/reducer";

import {
  getStateRequest,
  getReturningRequest,
  completeRequest,
  cancelRequest,
} from "./requests";
import IQueryReturingModel from "src/interfaces/Returning/IQueryReturningModel";
import { toUTCWithoutHour } from "src/utils/formatDateTime";
import { setActionResult } from "src/containers/User/reducer";

export function* handleGetReturingList(
  action: PayloadAction<IQueryReturingModel>
) {
  const queryReturningModel = action.payload;

  try {
    console.log(queryReturningModel);
    if (!queryReturningModel.returnedDate) {
      queryReturningModel.returnedDate = new Date("0001-01-01T00:00:00Z");
    } else {
      queryReturningModel.returnedDate = toUTCWithoutHour(
        queryReturningModel.returnedDate
      );
    }
    const { data } = yield call(getReturningRequest, queryReturningModel);
    yield put(setReturningList(data));
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
        label: "All",
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

export function* handleComplete(action: PayloadAction<CompleteAction>) {
  const { id, handleResult } = action.payload;
  try {
    const { data } = yield call(completeRequest, id);
    handleResult(data);
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

export function* handleCancel(action: PayloadAction<CancelAction>) {
  const { id, handleResult } = action.payload;
  try {
    const { data } = yield call(cancelRequest, id);
    handleResult(data);
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
