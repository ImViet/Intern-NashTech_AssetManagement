import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";

import { Status } from "src/constants/status";
import IChangePassword from "src/interfaces/IChangePassword";
import IChangePasswordFirstLogin from "src/interfaces/IChangePasswordFirstLogin";
import IError from "src/interfaces/IError";
import ILoginModel from "src/interfaces/ILoginModel";
import ISubmitAction from "src/interfaces/ISubmitActions";

import { ChangePasswordAction, setAccount, setStatus } from "../reducer";
import {
  loginRequest,
  getMeRequest,
  putChangePassword,
  putChangePasswordFirstLogin,
} from "./requests";

export function* handleLogin(action: PayloadAction<ILoginModel>) {
  const loginModel = action.payload;

  try {
    const { data } = yield call(loginRequest, loginModel);
    yield put(setAccount(data));
  } catch (error: any) {
    const message = error.response.data;
    yield put(
      setStatus({
        status: Status.Failed,
        error: { error: true, message: message },
      })
    );
  }
}

export function* handleGetMe() {
  try {
    const { data } = yield call(getMeRequest);

    if (data.userName) {
      yield put(setAccount(data));
    }
  } catch (error: any) {
    // console.log('login err: ', error.response.data);
  }
}

export function* handleChangePassword(
  action: PayloadAction<ChangePasswordAction>
) {
  const { handleResult, formValues } = action.payload;

  try {
    const { data } = yield call(putChangePassword, formValues);
    handleResult(data);

    yield put(
      setStatus({
        status: Status.Success,
      })
    );
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

export function* handleChangePasswordFirstLogin(
  action: PayloadAction<IChangePasswordFirstLogin>
) {
  const params = action.payload;

  try {
    const { data } = yield call(putChangePasswordFirstLogin, params);

    yield put(setAccount(data));
    yield put(
      setStatus({
        status: Status.Success,
      })
    );
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
