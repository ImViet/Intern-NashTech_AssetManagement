import { AxiosResponse } from "axios";
import qs from "qs";

import RequestService from "src/services/request";
import EndPoints from "src/constants/endpoints";
import IUserForm from "src/interfaces/User/IUserForm";
import IUser from "src/interfaces/User/IUser";
import IPagedModel from "src/interfaces/IPagedModel";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";

export function createUserRequest(
  userForm: IUserForm
): Promise<AxiosResponse<IUser>> {
  userForm.joinedDate = toUTC(userForm.joinedDate);
  userForm.dateOfBirth = toUTC(userForm.dateOfBirth);
  return RequestService.axios.post(EndPoints.user, userForm, {
    paramsSerializer: (params) => JSON.stringify(params),
  });
}

function toUTC(date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    )
  );
}

export function updateUserRequest(
  userForm: IUserForm
): Promise<AxiosResponse<IUser>> {
  return RequestService.axios.put(EndPoints.user, userForm, {
    paramsSerializer: (params) => JSON.stringify(params),
  });
}

export function getUsersRequest(
  userQuery: IQueryUserModel
): Promise<AxiosResponse<IUser[]>> {
  return RequestService.axios.get(EndPoints.user, {
    params: userQuery,
    paramsSerializer: (params) => qs.stringify(params),
  });
}

export function getUserByIdRequest(id: number): Promise<AxiosResponse<IUser>> {
  return RequestService.axios.get(EndPoints.user + "/" + id);
}
