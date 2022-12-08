import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IQueryAssigmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";
import ISelectOption from "src/interfaces/ISelectOption";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IAssignmentForm from "src/interfaces/Assignment/IAssignmentForm";
// import IAssetForm from "src/interfaces/Asset/IAssetForm";

type AssignmentState = {
  FilterAssignmentStateOptions: ISelectOption[];
  loading: boolean;
  assignmentFormData: IAssignmentForm | null;
  actionResult: IAssignment | null;
  assignments: IPagedModel<IAssignment> | null;
  assignmentResult: IAssignment | null;
  status?: number;
  error?: IError;
};

export type CreateAction = {
  handleResult: Function;
  formValues: IAssignmentForm;
};

export type UpdateAction = {
  handleResult: Function;
  formValues: IAssignmentForm;
};

export type DisableAction = {
  handleResult: Function;
  id: number;
};

const initialState: AssignmentState = {
  assignments: null,
  loading: false,
  assignmentResult: null,
  assignmentFormData: null,
  actionResult: null,
  FilterAssignmentStateOptions: [],
};

const AssignmentReducerSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    createAssignment: (
      state,
      action: PayloadAction<CreateAction>
    ): AssignmentState => {
      return {
        ...state,
        loading: true,
      };
    },
    updateAssignment: (
      state,
      action: PayloadAction<UpdateAction>
    ): AssignmentState => {
      return {
        ...state,
        loading: true,
      };
    },
    getAssignment: (state, action: PayloadAction<number>): AssignmentState => {
      return {
        ...state,
        loading: true,
      };
    },

    getAssignmentList: (
      state,
      action: PayloadAction<IQueryAssigmentModel>
    ): AssignmentState => {
      return {
        ...state,
        loading: true,
      };
    },
    setAssignmentList: (
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
        FilterAssignmentStateOptions: stateOptions,
        loading: false,
      };
    },
    setAssignmentResult: (
      state,
      action: PayloadAction<IAssignment>
    ): AssignmentState => {
      const assignmentResult = action.payload;

      return {
        ...state,
        assignmentResult,
        loading: false,
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
    getAssignmentFormData: (state, action: PayloadAction<number>): AssignmentState => {
      return {
        ...state,
        loading: true,
      };
    },
    setAssignmentFormData: (
      state,
      action: PayloadAction<IAssignmentForm>
    ): AssignmentState => {
      const assignmentFormData = action.payload;

      return {
        ...state,
        assignmentFormData,
        loading: false,
      };
    },
    disableAssignment: (
      state,
      action: PayloadAction<DisableAction>
    ): AssignmentState => {
      return {
        ...state,
        loading: true,
      };
    },
    cleanUpActionResult: (state, action: PayloadAction): AssignmentState => {
      return {
        ...state,
        actionResult: null,
      };
    },
  },
});

export const {
  createAssignment,
  updateAssignment,
  setActionResult,
  setAssignmentResult,
  setAssignmentList,
  getAssignmentList,
  getState,
  setState,
  setStatus,
  getAssignment,
  getAssignmentFormData,
  setAssignmentFormData,
  disableAssignment,
  cleanUpActionResult,
} = AssignmentReducerSlice.actions;

export default AssignmentReducerSlice.reducer;
