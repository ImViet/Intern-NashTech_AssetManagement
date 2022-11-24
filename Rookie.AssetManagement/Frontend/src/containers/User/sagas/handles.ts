import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import IUser from "src/interfaces/User/IUser";
import {
  addToTopList,
  CreateAction,
  setActionResult,
  setStatus,
  setUser,
  setUserList,
  UpdateAction,
} from "../reducer";
import {
  createUserRequest,
  getUserByIdRequest,
  getUsersRequest,
  updateUserRequest,
} from "./requests";

export function* handleCreateUser(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    console.log("handleCreateUser");
    console.log(formValues);

    const { data } = yield call(createUserRequest, formValues);
    data.dateOfBirth = new Date(data.dateOfBirth);
    data.joinedDate = new Date(data.joinedDate);

    if (data) {
      handleResult(true, data);
    }

    yield put(setActionResult(data));
  } catch (error: any) {
    const errors = error.response.data.errors;
    const firstError = errors[Object.keys(errors)[0]][0];
    handleResult(false, firstError);
    yield put(
      setStatus({
        status: Status.Failed,
        error: firstError,
      })
    );
  }
}

export function* handleUpdateUser(action: PayloadAction<UpdateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    console.log("handleUpdateUser");
    console.log(formValues);

    const { data } = yield call(updateUserRequest, formValues);
    data.dateOfBirth = new Date(data.dateOfBirth);
    data.joinedDate = new Date(data.joinedDate);

    if (data) {
      handleResult(true, data.firstName);
    }

    yield put(setActionResult(data));
  } catch (error: any) {
    debugger;
    const errors = error.response.data.errors;
    const firstError = errors[Object.keys(errors)[0]][0];
    handleResult(false, firstError);
    yield put(
      setStatus({
        status: Status.Failed,
        error: firstError,
      })
    );
  }
}

export function* handleGetUserList(action: PayloadAction<IQueryUserModel>) {
  const queryUserModel = action.payload;

  try {
    const { data } = yield call(getUsersRequest, queryUserModel);
    yield put(setUserList(data));
  } catch (error: any) {
    const errorModel = error.response.data as IError;

    yield put(
      setStatus({
        status: Status.Failed,
        error: errorModel,
      })
    );
  }
}

export function* handleGetUserById(action: PayloadAction<number>) {
  const id = action.payload;

  try {
    const { data } = yield call(getUserByIdRequest, id);
    data.dateOfBirth = new Date(data.dateOfBirth);
    data.joinedDate = new Date(data.joinedDate);
    yield put(setUser(data));
  } catch (error: any) {
    const errorModel = error.response.data as IError;

    yield put(
      setStatus({
        status: Status.Failed,
        error: errorModel,
      })
    );
  }
}
