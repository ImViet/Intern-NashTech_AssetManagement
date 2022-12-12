import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IQueryMyAssignmentModel from "src/interfaces/Assignment/IQueryMyAssignmentModel";

type AssignmentState = {
  loading: boolean;
  assignments: IPagedModel<IAssignment> | null;
  assignmentResult: IAssignment | null;
  error?: IError;
  actionResult: IAssignment | null;
};

const initialState: AssignmentState = {
  assignments: null,
  loading: false,
  assignmentResult: null,
  actionResult: null,
};

export type DeclineAction = {
  id: number;
  handleResult: Function;
};

export type AcceptAction = {
  id: number;
  handleResult: Function;
};

const MyAssignmentReducerSlice = createSlice({
  name: "my-assignment",
  initialState,
  reducers: {
    getMyAssignmentList: (
      state,
      action: PayloadAction<IQueryMyAssignmentModel>
    ): AssignmentState => {
      return {
        ...state,
        loading: true,
      };
    },
    setMyAssignmentList: (
      state,
      action: PayloadAction<IPagedModel<IAssignment>>
    ): AssignmentState => {
      const assignments = action.payload;

      return {
        ...state,
        assignments,
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
    acceptAssignment: (state, action: PayloadAction<AcceptAction>) => {
      return {
        ...state,
        loading: true,
      };
    },
    declineAssignment: (state, action: PayloadAction<DeclineAction>) => {
      return {
        ...state,
        loading: true,
      };
    },
    setActionResult: (
      state,
      action: PayloadAction<IAssignment>
    ): AssignmentState => {
      const actionResult = action.payload;

      return {
        ...state,
        actionResult,
        loading: false,
      };
    },
    cleanUpActionResult: (state): AssignmentState => {
      return {
        ...state,
        actionResult: null,
        loading: false,
      };
    },
  },
});

export const {
  setMyAssignmentList,
  getMyAssignmentList,
  setStatus,
  acceptAssignment,
  setActionResult,
  cleanUpActionResult,
  declineAssignment,
} = MyAssignmentReducerSlice.actions;

export default MyAssignmentReducerSlice.reducer;
