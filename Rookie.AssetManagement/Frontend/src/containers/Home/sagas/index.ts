import { takeLatest } from "redux-saga/effects";
import { acceptAssignment, getMyAssignmentList } from "../reducer";
import {
   handleGetMyAssignmentList,
   handleAccept,
 } from "./handles";

export default function* MyAssignmentSagas() {
  yield takeLatest(getMyAssignmentList.type, handleGetMyAssignmentList);
  yield takeLatest(acceptAssignment.type, handleAccept);
}
