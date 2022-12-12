import { takeLatest } from "redux-saga/effects";
import {
  getState,
  getReturningList
} from "../reducer";
import {
  handleGetStateList,
  handleGetReturingList,
} from "./handles";

export default function* ReturningSagas() {
  yield takeLatest(getState.type, handleGetStateList);
  yield takeLatest(getReturningList.type, handleGetReturingList);
}
