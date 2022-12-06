import { AxiosResponse } from "axios";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IQueryAssigmentModel from "src/interfaces/Assignment/IQueryAssignmentModel";
import RequestService from "src/services/request";
import qs from "qs";
import EndPoints from "src/constants/endpoints";
import IState from "src/interfaces/Asset/IState";
// import IAssetForm from "src/interfaces/Asset/IAssetForm";

// export function getAssignmentsRequest(
//   assigmentQuery: IQueryAssigmentModel
// ): Promise<AxiosResponse<IAssignment[]>> {
//   return RequestService.axios.get(EndPoints.searchAsset, {
//     params: assigmentQuery,
//     paramsSerializer: (params) => qs.stringify(params),
//   });
// }

export function getAssignmentsRequest(assigmentQuery: IQueryAssigmentModel): 
Promise<AxiosResponse<IAssignment[]>> 
{
    return RequestService.axios.get(EndPoints.assignment);
}

export function getAssignmentByIdRequest(id: number): Promise<AxiosResponse<IAssignment>> {
  return RequestService.axios.get(EndPoints.assignment + "/" + id);
}

export function getStateRequest(): Promise<AxiosResponse<IState[]>> {
  return RequestService.axios.get(EndPoints.state);
}
