import { takeLatest } from "redux-saga/effects";
import {
  createAssignment,
  disableAssignment,
  getAssignmentList,
  getState,
  getAssignment,
  updateAssignment,
} from "../reducer";
import {
  handleGetAssignmentList,
  handleGetAssignmentById,
  handleGetStateList,
  handleCreateAssignment,
  handleDisableAssignment
} from "./handles";

export default function* AssignmentSagas() {
  yield takeLatest(getAssignmentList.type, handleGetAssignmentList);
  yield takeLatest(getState.type, handleGetStateList);
  yield takeLatest(getAssignment.type, handleGetAssignmentById);
  yield takeLatest(createAssignment.type, handleCreateAssignment);
  yield takeLatest(disableAssignment.type, handleDisableAssignment);
}
