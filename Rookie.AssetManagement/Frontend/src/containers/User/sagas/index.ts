import { takeLatest } from "redux-saga/effects";
import { createUser, updateUser, getUserList, getUser } from "../reducer";

import {
  handleCreateUser,
  handleUpdateUser,
  handleGetUserList,
  handleGetUserById,
} from "./handles";

export default function* UserSagas() {
  yield takeLatest(createUser.type, handleCreateUser);
  yield takeLatest(updateUser.type, handleUpdateUser);
  yield takeLatest(getUserList.type, handleGetUserList);
  yield takeLatest(getUser.type, handleGetUserById);
}
