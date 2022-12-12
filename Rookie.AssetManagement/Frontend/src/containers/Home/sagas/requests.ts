import { AxiosResponse } from "axios";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IQueryMyAssignmentModel from "src/interfaces/Assignment/IQueryMyAssignmentModel";
import RequestService from "src/services/request";
import qs from "qs";
import EndPoints from "src/constants/endpoints";

export function getMyAssignmentsRequest(
  assigmentQuery: IQueryMyAssignmentModel
): Promise<AxiosResponse<IAssignment[]>> {
  return RequestService.axios.get(EndPoints.assignment + "/my", {
    params: assigmentQuery,
    paramsSerializer: (params) => qs.stringify(params),
  });
}
