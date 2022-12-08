import { takeLatest } from "redux-saga/effects";
import {
  createAssignment,
  disableAssignment,
  getAssignmentList,
  getState,
  getAssignment,
  updateAssignment,
  getAssignmentFormData,
} from "../reducer";
import {
  handleGetAssignmentList,
  handleGetAssignmentById,
  handleGetStateList,
  handleCreateAssignment,
  handleUpdateAssignment,
  handleGetAssignmentForm,
} from "./handles";

export default function* AssignmentSagas() {
  yield takeLatest(getAssignmentList.type, handleGetAssignmentList);
  yield takeLatest(getState.type, handleGetStateList);
  yield takeLatest(getAssignment.type, handleGetAssignmentById);
  yield takeLatest(getAssignmentFormData.type, handleGetAssignmentForm);
  yield takeLatest(createAssignment.type, handleCreateAssignment);
  yield takeLatest(updateAssignment.type, handleUpdateAssignment);

}
