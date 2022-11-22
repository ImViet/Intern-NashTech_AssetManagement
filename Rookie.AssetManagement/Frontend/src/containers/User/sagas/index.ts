import { takeLatest } from "redux-saga/effects";
import { createUser, updateUser, getUserList } from "../reducer";

import {
  handleCreateUser,
  handleUpdateUser,
  handleGetUserList,
} from "./handles";

export default function* UserSagas() {
  yield takeLatest(createUser.type, handleCreateUser);
  yield takeLatest(updateUser.type, handleUpdateUser);
  yield takeLatest(getUserList.type, handleGetUserList);
}
