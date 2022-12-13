import { takeLatest } from "redux-saga/effects";
import {
  acceptAssignment,
  declineAssignment,
  getMyAssignmentList,
  returnAssignment,
} from "../reducer";
import {
  handleGetMyAssignmentList,
  handleAccept,
  handleDecline,
  handleReturn,
} from "./handles";

export default function* MyAssignmentSagas() {
  yield takeLatest(getMyAssignmentList.type, handleGetMyAssignmentList);
  yield takeLatest(acceptAssignment.type, handleAccept);
  yield takeLatest(declineAssignment.type, handleDecline);
  yield takeLatest(returnAssignment.type, handleReturn);
}
