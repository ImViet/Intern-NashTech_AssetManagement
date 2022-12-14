import { takeLatest } from "redux-saga/effects";
import { getState, getReturningList, complete, cancel } from "../reducer";
import {
  handleGetStateList,
  handleGetReturingList,
  handleComplete,
  handleCancel,
} from "./handles";

export default function* ReturningSagas() {
  yield takeLatest(getState.type, handleGetStateList);
  yield takeLatest(getReturningList.type, handleGetReturingList);
  yield takeLatest(complete.type, handleComplete);
  yield takeLatest(cancel.type, handleCancel);
}
