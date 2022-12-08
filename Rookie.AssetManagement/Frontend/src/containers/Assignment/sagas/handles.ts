import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import {
  //   setAssetFormData,
  setState,
  setStatus,
} from "src/containers/Assignment/reducer";
import IError from "src/interfaces/IError";
import IQueryAssignmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";
import ISelectOption from "src/interfaces/ISelectOption";
import { toUTCWithoutHour } from "src/utils/formatDateTime";
import {
  setAssignmentList,
  CreateAction,
  UpdateAction,
  setAssignmentResult,
  setActionResult,
  DisableAction,
} from "../reducer";
import {
  getStateRequest,
  getAssignmentsRequest,
  getAssignmentByIdRequest,
  createAssignmentRequest,
  disableAssignmentRequest
} from "./requests";
import IAssignmentForm from "src/interfaces/Assignment/IAssignmentForm";

export function* handleGetAssignmentList(
  action: PayloadAction<IQueryAssignmentModel>
) {
  const queryAssigmentModel = action.payload;

  try {
    console.log(queryAssigmentModel);
    if (!queryAssigmentModel.assignedDate) {
      queryAssigmentModel.assignedDate = new Date("0001-01-01T00:00:00Z");
    } else {
      queryAssigmentModel.assignedDate = toUTCWithoutHour(
        queryAssigmentModel.assignedDate
      );
    }
    const { data } = yield call(getAssignmentsRequest, queryAssigmentModel);
    yield put(setAssignmentList(data));
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

export function* handleGetStateList() {
  try {
    const { data } = yield call(getStateRequest);
    const options = [
      {
        id: 1,
        label: "All",
        value: "ALL",
      },
    ];
    data.forEach((state, index) => {
      options.push({
        id: index + 2,
        label: state.stateName,
        value: state.id,
      });
    });
    debugger;
    yield put(setState(options));
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

export function* handleGetAssignmentById(action: PayloadAction<number>) {
  const id = action.payload;

  try {
    const { data } = yield call(getAssignmentByIdRequest, id);
    data.AssignedDate = new Date(data.AssignedDate);
    yield put(setAssignmentResult(data));
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

export function* handleCreateAssignment(action: PayloadAction<CreateAction>) {
  const { formValues, handleResult } = action.payload;
  try {
    console.log(formValues);

    formValues.assignedDate = toUTCWithoutHour(formValues.assignedDate);
    formValues.asset = formValues.asset.toString();
    formValues.user = formValues.user.toString();

    const { data } = yield call(createAssignmentRequest, formValues);

    data.assignedDate = new Date(data.assignedDate);

    if (data) {
      handleResult(true);
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

export function* handleDisableAssignment(action: PayloadAction<DisableAction>) {
  const { id, handleResult } = action.payload;
  try {
    const { data } = yield call(disableAssignmentRequest, id);

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