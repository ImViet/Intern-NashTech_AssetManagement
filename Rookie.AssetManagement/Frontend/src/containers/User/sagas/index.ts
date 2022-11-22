import { takeLatest } from "redux-saga/effects";
import { createUser, updateUser } from "../reducer";

import { handleCreateUser, handleUpdateUser } from "./handles";

export default function* UserSagas() {
  yield takeLatest(createUser.type, handleCreateUser);
  yield takeLatest(updateUser.type, handleUpdateUser);
}
