import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IQueryAssignmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";
import ICategory from "src/interfaces/Category/ICategory";
import ISelectOption from "src/interfaces/ISelectOption";
// import IAssignmentForm from "src/interfaces/Assignment/IAssignmentForm";

type AssignmentState = {
  FilterAssignmentStateOptions: ISelectOption[];
  loading: boolean;
//   assignmentFormData: IAssignmentForm | null;
  actionResult: IAssignment | null;
  assignments: IPagedModel<IAssignment> | null;
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

// export type DisableAction = {
//   handleResult: Function;
//   id: number;
// };

const initialState: AssignmentState = {
  assignments: null,
  loading: false,
  //assignmentFormData: null,
  actionResult: null,
  FilterAssignmentStateOptions: [],
};

const AssignmentReducerSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    // createAssignment: (state, action: PayloadAction<CreateAction>): AssignmentState => {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // },
    // updateAssignment: (state, action: PayloadAction<UpdateAction>): AssignmentState => {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // },

    getAssignmentList: (
      state,
      action: PayloadAction<IQueryAssignmentModel>
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
    setActionResult: (state, action: PayloadAction<IAssignment>): AssignmentState => {
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
    // setAssignmentFormData: (
    //   state,
    //   action: PayloadAction<IAssignmentForm>
    // ): AssignmentState => {
    //   const assignmentFormData = action.payload;

    //   return {
    //     ...state,
    //     assignmentFormData,
    //     loading: false,
    //   };
    // },
    // disableAssignment: (state, action: PayloadAction<DisableAction>): AssignmentState => {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // },
    cleanUpActionResult: (state, action: PayloadAction): AssignmentState => {
      return {
        ...state,
        actionResult: null,
      };
    },
  },
});

export const {
  //createAssignment,
  //updateAssignment,
  setActionResult,
  setAssignmentList,
  getAssignmentList,
  getState,
  setState,
  setStatus,
  getAssignmentFormData,
  //setAssignmentFormData,
  //disableAssignment,
  cleanUpActionResult,
} = AssignmentReducerSlice.actions;

export default AssignmentReducerSlice.reducer;
