import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IQueryReturningModel from "src/interfaces/Returning/IQueryReturningModel";
import ISelectOption from "src/interfaces/ISelectOption";
import IReturning from "src/interfaces/Returning/IReturning";
//import IAssignmentForm from "src/interfaces/Assignment/IAssignmentForm";
// import IAssetForm from "src/interfaces/Asset/IAssetForm";

type ReturningState = {
  FilterReturningStateOptions: ISelectOption[];
  loading: boolean;
  //assignmentFormData: IAssignmentForm | null;
  actionResult: IReturning | null;
  returnings: IPagedModel<IReturning> | null;
  returningResult: IReturning | null;
  status?: number;
  error?: IError;
};

// export type CreateAction = {
//   handleResult: Function;
//   formValues: IAssignmentForm;
// };

// export type UpdateAction = {
//   handleResult: Function;
//   formValues: IAssignmentForm;
// };

export type DisableAction = {
  handleResult: Function;
  id: number;
};

export type CompleteAction = {
  handleResult: Function;
  id: number;
};

export type CancelAction = {
  handleResult: Function;
  id: number;
};

const initialState: ReturningState = {
  returnings: null,
  loading: false,
  returningResult: null,
  //assignmentFormData: null,
  actionResult: null,
  FilterReturningStateOptions: [],
};

const ReturningReducerSlice = createSlice({
  name: "returning",
  initialState,
  reducers: {
    getReturning: (state, action: PayloadAction<number>): ReturningState => {
      return {
        ...state,
        loading: true,
      };
    },
    getReturningList: (
      state,
      action: PayloadAction<IQueryReturningModel>
    ): ReturningState => {
      return {
        ...state,
        loading: true,
      };
    },
    setReturningList: (
      state,
      action: PayloadAction<IPagedModel<IReturning>>
    ): ReturningState => {
      const returnings = action.payload;

      return {
        ...state,
        returnings,
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
    getState: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    setState: (state, action: PayloadAction<ISelectOption[]>) => {
      const stateOptions = action.payload;
      return {
        ...state,
        FilterReturningStateOptions: stateOptions,
        loading: false,
      };
    },
    setReturningResult: (
      state,
      action: PayloadAction<IReturning>
    ): ReturningState => {
      const returningResult = action.payload;

      return {
        ...state,
        returningResult,
        loading: false,
      };
    },
    setActionResult: (
      state,
      action: PayloadAction<IReturning>
    ): ReturningState => {
      const actionResult = action.payload;

      return {
        ...state,
        actionResult,
        loading: false,
      };
    },
    disableReturning: (
      state,
      action: PayloadAction<DisableAction>
    ): ReturningState => {
      return {
        ...state,
        loading: true,
      };
    },
    cleanUpActionResult: (state, action: PayloadAction): ReturningState => {
      return {
        ...state,
        actionResult: null,
      };
    },
    complete: (
      state,
      action: PayloadAction<CompleteAction>
    ): ReturningState => {
      return {
        ...state,
        loading: true,
      };
    },
    cancel: (state, action: PayloadAction<CancelAction>): ReturningState => {
      return {
        ...state,
        loading: true,
      };
    },
  },
});

export const {
  complete,
  cancel,
  setActionResult,
  setReturningResult,
  setReturningList,
  getReturningList,
  getState,
  setState,
  setStatus,
  getReturning,
  disableReturning,
  cleanUpActionResult,
} = ReturningReducerSlice.actions;

export default ReturningReducerSlice.reducer;
