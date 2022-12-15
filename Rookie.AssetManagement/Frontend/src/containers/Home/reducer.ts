import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IQueryMyAssignmentModel from "src/interfaces/Assignment/IQueryMyAssignmentModel";
import IMyAssignment from "src/interfaces/Assignment/IMyAssignment";

type MyAssignmentState = {
  loading: boolean;
  assignments: IPagedModel<IMyAssignment> | null;
  assignmentResult: IMyAssignment | null;
  error?: IError;
  actionResult: IMyAssignment | null;
};

const initialState: MyAssignmentState = {
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
export type ReturnAction = {
  id: number;
  assignment: IMyAssignment;
  handleResult: Function;
};
const MyAssignmentReducerSlice = createSlice({
  name: "my-assignment",
  initialState,
  reducers: {
    getMyAssignmentList: (
      state,
      action: PayloadAction<IQueryMyAssignmentModel>
    ): MyAssignmentState => {
      return {
        ...state,
        loading: true,
      };
    },
    setMyAssignmentList: (
      state,
      action: PayloadAction<IPagedModel<IMyAssignment>>
    ): MyAssignmentState => {
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
    returnAssignment: (state, action: PayloadAction<ReturnAction>) => {
      return {
        ...state,
        loading: true,
      };
    },
    setActionResult: (
      state,
      action: PayloadAction<IMyAssignment>
    ): MyAssignmentState => {
      const actionResult = action.payload;

      return {
        ...state,
        actionResult,
        loading: false,
      };
    },
    cleanUpActionResult: (state): MyAssignmentState => {
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
  returnAssignment,
} = MyAssignmentReducerSlice.actions;

export default MyAssignmentReducerSlice.reducer;
