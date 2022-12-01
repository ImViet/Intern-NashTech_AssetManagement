import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import IUser from "src/interfaces/User/IUser";
import { toUTC } from "src/utils/formatDateTime";
import {
  CreateAction,
  setStatus,
  setUserResult,
  setActionResult,
  setUserList,
  UpdateAction,
  DisableAction,
} from "../reducer";
import {
  createUserRequest,
  getUserByIdRequest,
  getUsersRequest,
  updateUserRequest,
  disableUserRequest,
} from "./requests";

export function* handleCreateUser(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    console.log("handleCreateUser");
    console.log(formValues);

    formValues.joinedDate = toUTC(formValues.joinedDate);
    formValues.dateOfBirth = toUTC(formValues.dateOfBirth);

    const { data } = yield call(createUserRequest, formValues);

    data.dateOfBirth = new Date(data.dateOfBirth);
    data.joinedDate = new Date(data.joinedDate);

    if (data) {
      handleResult(true, data.firstName);
    }

    yield put(setActionResult(data));
  } catch (error: any) {
    const errorModel = error.response.data;
    handleResult(false, errorModel);
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: "",
        },
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
    const errorModel = error.response.data;
    handleResult(false, errorModel);
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: "",
        },
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

export function* handleGetUserById(action: PayloadAction<number>) {
  const id = action.payload;

  try {
    const { data } = yield call(getUserByIdRequest, id);
    data.dateOfBirth = new Date(data.dateOfBirth);
    data.joinedDate = new Date(data.joinedDate);
    yield put(setUserResult(data));
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

export function* handleDisableUser(action: PayloadAction<DisableAction>) {
  const { id, handleResult } = action.payload;
  try {
    const { data } = yield call(disableUserRequest, id);

    if (data) {
      handleResult(true, "");
    }
  } catch (error: any) {
    const message = error.response.data;
    handleResult(false, message);
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
