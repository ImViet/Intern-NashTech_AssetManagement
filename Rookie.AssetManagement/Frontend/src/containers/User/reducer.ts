import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import IUser from "src/interfaces/User/IUser";
import IUserForm from "src/interfaces/User/IUserForm";

type UserState = {
  loading: boolean;
  userResult: IUser | null;
  users: IPagedModel<IUser> | null;
  status?: number;
  error?: IError;
  disable: boolean;
};

export type CreateAction = {
  handleResult: Function;
  formValues: IUserForm;
};

export type UpdateAction = {
  handleResult: Function;
  formValues: IUserForm;
};

const initialState: UserState = {
  users: null,
  loading: false,
  disable: false,
  userResult: null,
};

const UserReducerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<CreateAction>): UserState => {
      return {
        ...state,
        loading: true,
      };
    },
    updateUser: (state, action: PayloadAction<UpdateAction>): UserState => {
      return {
        ...state,
        loading: true,
      };
    },
    getUser: (state, action: PayloadAction<number>): UserState => {
      return {
        ...state,
        loading: true,
      };
    },
    getUserList: (state, action: PayloadAction<IQueryUserModel>): UserState => {
      return {
        ...state,
        loading: true,
      };
    },
    setUserList: (
      state,
      action: PayloadAction<IPagedModel<IUser>>
    ): UserState => {
      const users = action.payload;

      return {
        ...state,
        users,
        loading: false,
      };
    },
    setUser: (state, action: PayloadAction<IUser>): UserState => {
      const userResult = action.payload;

      return {
        ...state,
        userResult,
        loading: false,
      };
    },
    setStatus: (state, action: PayloadAction<SetStatusType>) => {
      const { status, error } = action.payload;
      return {
        ...state,
        status,
        error,
        loading: false,
      };
    },
  },
});

export const {
  createUser,
  updateUser,
  setUser,
  setUserList,
  setStatus,
  getUserList,
  getUser,
} = UserReducerSlice.actions;

export default UserReducerSlice.reducer;
