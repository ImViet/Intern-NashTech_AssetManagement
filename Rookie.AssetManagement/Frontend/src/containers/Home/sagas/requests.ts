import { AxiosResponse } from "axios";
import IAssignment from "src/interfaces/Assignment/IAssignment";
import IQueryMyAssignmentModel from "src/interfaces/Assignment/IQueryMyAssignmentModel";
import RequestService from "src/services/request";
import qs from "qs";
import EndPoints from "src/constants/endpoints";
import IMyAssignment from "src/interfaces/Assignment/IMyAssignment";
import IReturning from "src/interfaces/Returning/IReturning";

export function getMyAssignmentsRequest(
  assigmentQuery: IQueryMyAssignmentModel
): Promise<AxiosResponse<IMyAssignment[]>> {
  return RequestService.axios.get(EndPoints.assignment + "/my", {
    params: assigmentQuery,
    paramsSerializer: (params) => qs.stringify(params),
  });
}

export function acceptAssignmentRequest(
  assignmentId: number
): Promise<AxiosResponse<IAssignment>> {
  return RequestService.axios.patch(
    `${EndPoints.assignment}/accept/${assignmentId}`
  );
}

export function declineAssignmentRequest(
  assignmentId: number
): Promise<AxiosResponse<IAssignment>> {
  return RequestService.axios.patch(
    `${EndPoints.assignment}/decline/${assignmentId}`
  );
}

export function returnAssignmentRequest(
  assignmentId
): Promise<AxiosResponse<IReturning>> {
  return RequestService.axios.post(EndPoints.returning, {
    assignmentId: assignmentId,
  });
}
