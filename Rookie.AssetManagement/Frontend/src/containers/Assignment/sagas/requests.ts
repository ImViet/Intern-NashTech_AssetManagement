import { AxiosResponse } from "axios";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IQueryAssigmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";
import RequestService from "src/services/request";
import qs from "qs";
import EndPoints from "src/constants/endpoints";
import IState from "src/interfaces/Asset/IState";
import IQueryUserModel from "src/interfaces/User/IQueryUserModel";
import IUser from "src/interfaces/User/IUser";
import IAsset from "src/interfaces/Asset/IAsset";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import IAssignmentForm from "src/interfaces/Assignment/IAssignmentForm";
// import IAssetForm from "src/interfaces/Asset/IAssetForm";

export function getAssignmentsRequest(
  assigmentQuery: IQueryAssigmentModel
): Promise<AxiosResponse<IAssignment[]>> {
  return RequestService.axios.get(EndPoints.searchAssignment, {
    params: assigmentQuery,
    paramsSerializer: (params) => qs.stringify(params),
  });
}

// export function getAssignmentsRequest(assigmentQuery: IQueryAssigmentModel):
// Promise<AxiosResponse<IAssignment[]>>
// {
//     return RequestService.axios.get(EndPoints.assignment);
// }

export function getAssignmentByIdRequest(
  id: number
): Promise<AxiosResponse<IAssignment>> {
  return RequestService.axios.get(EndPoints.assignment + "/" + id);
}

export function getStateRequest(): Promise<AxiosResponse<IState[]>> {
  return RequestService.axios.get(EndPoints.state);
}

export function createAssignmentRequest(
  assignmentForm: IAssignmentForm
): Promise<AxiosResponse<IAssignment>> {
  return RequestService.axios.post(EndPoints.assignment, assignmentForm);
}

export function updateAssignmentRequest(
  assignmentForm: IAssignmentForm
): Promise<AxiosResponse<IAssignment>> {
  return RequestService.axios.put(EndPoints.assignment, assignmentForm, {
    paramsSerializer: (params) => JSON.stringify(params),
  });
}
export function getAssignmentFormDataRequest(
  id: number
): Promise<AxiosResponse<IAssignmentForm>> {
  return RequestService.axios.get(`${EndPoints.getAssignmentDataForm}/${id}`);
}

export function getLookUpUserRequest(
  userQuery: IQueryUserModel
): Promise<AxiosResponse<IUser[]>> {
  return RequestService.axios.get(EndPoints.user + "/lookupuser", {
    params: userQuery,
    paramsSerializer: (params) => qs.stringify(params),
  });
}

export function getLookUpAssetRequest(
  assetQuery: IQueryAssetModel
): Promise<AxiosResponse<IAsset[]>> {
  return RequestService.axios.get(EndPoints.asset + "/getlookupasset", {
    params: assetQuery,
    paramsSerializer: (params) => qs.stringify(params),
  });
}

// export function disableAssignmentRequest(id: number): Promise<AxiosResponse<IAssignment>> {
//   return RequestService.axios.delete(EndPoints.assignment + "/" + id);
// }
