import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IUser from "src/interfaces/User/IUser";
import IUserForm from "src/interfaces/User/IUserForm";

type UserState = {
  loading: boolean;
  userResult?: IUser;
  users: IPagedModel<IUser> | null;
  status?: number;
  error?: IError;
  disable: boolean;
};

export type CreateAction = {
  handleResult: Function;
  formValues: IUserForm;
};

const initialState: UserState = {
  users: null,
  loading: false,
  disable: false,
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
    setUser: (state, action: PayloadAction<IUser>): UserState => {
      const userResult = action.payload;

      return {
        ...state,
        userResult,
        loading: false,
      };
    },
  },
});

export const { createUser, setUser } = UserReducerSlice.actions;

export default UserReducerSlice.reducer;
