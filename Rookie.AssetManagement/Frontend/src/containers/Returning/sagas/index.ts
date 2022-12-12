import { takeLatest } from "redux-saga/effects";
import {
  getState,
} from "../reducer";
import {
  handleGetStateList,
} from "./handles";

export default function* ReturningSagas() {
  yield takeLatest(getState.type, handleGetStateList);
}
