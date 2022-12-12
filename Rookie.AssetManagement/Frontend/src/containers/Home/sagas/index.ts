import { takeLatest } from "redux-saga/effects";
import {
  acceptAssignment,
  declineAssignment,
  getMyAssignmentList,
} from "../reducer";
import {
  handleGetMyAssignmentList,
  handleAccept,
  handleDecline,
} from "./handles";

export default function* MyAssignmentSagas() {
  yield takeLatest(getMyAssignmentList.type, handleGetMyAssignmentList);
  yield takeLatest(acceptAssignment.type, handleAccept);
  yield takeLatest(declineAssignment.type, handleDecline);
}
