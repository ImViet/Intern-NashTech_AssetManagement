import { AxiosResponse } from "axios";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IQueryMyAssignmentModel from "src/interfaces/Assignment/IQueryMyAssignmentModel";
import RequestService from "src/services/request";
import qs from "qs";
import EndPoints from "src/constants/endpoints";
import IMyAssignment from "src/interfaces/Assignment/IMyAssignment";

export function getMyAssignmentsRequest(
  assigmentQuery: IQueryMyAssignmentModel
): Promise<AxiosResponse<IMyAssignment[]>> {
  return RequestService.axios.get(EndPoints.assignment + "/my", {
    params: assigmentQuery,
    paramsSerializer: (params) => qs.stringify(params),
  });
}
