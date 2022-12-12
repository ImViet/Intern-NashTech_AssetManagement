import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SetStatusType } from "src/constants/status";
import IAccount from "src/interfaces/IAccount";
import IChangePassword from "src/interfaces/IChangePassword";
import IChangePasswordFirstLogin from "src/interfaces/IChangePasswordFirstLogin";
import IError from "src/interfaces/IError";
import ILoginModel from "src/interfaces/ILoginModel";
import ISubmitAction from "src/interfaces/ISubmitActions";
import request from "src/services/request";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "src/utils/localStorage";

type AuthState = {
  loading: boolean;
  isAuth: boolean;
  account?: IAccount;
  status?: number;
  error?: IError;
};

export type ChangePasswordAction = {
  handleResult: Function;
  formValues: IChangePassword;
};

const token = getLocalStorage("token");

const initialState: AuthState = {
  isAuth: !!token,
  loading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccount: (
      state: AuthState,
      action: PayloadAction<IAccount>
    ): AuthState => {
      const account = action.payload;
      if (account?.token) {
        request.setAuthentication(account.token);
        setLocalStorage("token", account.token);
      } else if (token) {
        account.token = token;
        request.setAuthentication(token);
      }
      account.isNewUser = account.isNewUser?.toString() == "True";
      return {
        ...state,
        // status: Status.Success,
        account,
        isAuth: true,
        loading: false,
      };
    },
    setStatus: (state: AuthState, action: PayloadAction<SetStatusType>) => {
      const { status, error } = action.payload;
      return {
        ...state,
        status,
        error,
        loading: false,
      };
    },
    me: (state) => {
      if (token) {
        request.setAuthentication(token);
      }
    },
    login: (state: AuthState, action: PayloadAction<ILoginModel>) => ({
      ...state,
      loading: true,
    }),
    changePassword: (
      state: AuthState,
      action: PayloadAction<ChangePasswordAction>
    ) => {
      return {
        ...state,
        loading: true,
      };
    },
    changePasswordFirstLogin: (
      state: AuthState,
      action: PayloadAction<IChangePasswordFirstLogin>
    ) => {
      return {
        ...state,
        loading: true,
      };
    },
    logout: (state: AuthState) => {
      removeLocalStorage("token");
      request.setAuthentication("");
      window.location.reload();
      return {
        ...state,
        isAuth: false,
        account: undefined,
        status: undefined,
      };
    },
    cleanUp: (state) => ({
      ...state,
      loading: false,
      status: undefined,
      error: undefined,
    }),
  },
});

export const {
  setAccount,
  login,
  setStatus,
  me,
  changePassword,
  changePasswordFirstLogin,
  logout,
  cleanUp,
} = AuthSlice.actions;

export default AuthSlice.reducer;
