import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import {
  //   setAssetFormData,
  setState,
  setStatus,
} from "src/containers/Returning/reducer";


import {
  getStateRequest,

} from "./requests";

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



