import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";

import IError from "src/interfaces/IError";
import { CreateAction, setUser } from "../reducer";
import { createUserRequest } from "./requests";

export function* handleCreateUser(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    console.log("handleCreateUser");
    console.log(formValues);

    const { data } = yield call(createUserRequest, formValues);

    if (data) {
      handleResult(true, data);
    }

    yield put(setUser(data));
  } catch (error: any) {
    const errorModel = error.response.data as IError;

    handleResult(false, errorModel.message);
  }
}
