import { takeLatest } from "redux-saga/effects";
import {
  createAssignment,
  disableAssignment,
//   getAssetFormData,
  getAssignmentList,
  getState,
  getAssignment,
  updateAssignment,
} from "../reducer";
import {
  handleGetAssignmentList,
  handleGetAssignmentById,
  handleGetStateList,
} from "./handles";

export default function* AssignmentSagas() {
  yield takeLatest(getAssignmentList.type, handleGetAssignmentList);
  yield takeLatest(getState.type, handleGetStateList);
  yield takeLatest(getAssignment.type, handleGetAssignmentById);
}
