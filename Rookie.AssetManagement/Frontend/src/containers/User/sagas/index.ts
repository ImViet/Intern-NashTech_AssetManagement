import { takeLatest } from "redux-saga/effects";
import { createUser } from "../reducer";

import { handleCreateUser } from "./handles";

export default function* UserSagas() {
  yield takeLatest(createUser.type, handleCreateUser);
}
