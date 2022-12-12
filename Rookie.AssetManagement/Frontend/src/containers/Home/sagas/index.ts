import { takeLatest } from "redux-saga/effects";
import { getMyAssignmentList } from "../reducer";
import { handleGetMyAssignmentList } from "./handles";

export default function* MyAssignmentSagas() {
  yield takeLatest(getMyAssignmentList.type, handleGetMyAssignmentList);
}
