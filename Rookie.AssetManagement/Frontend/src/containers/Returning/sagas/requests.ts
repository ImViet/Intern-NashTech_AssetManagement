import { AxiosResponse } from "axios";
import RequestService from "src/services/request";
import EndPoints from "src/constants/endpoints";
import IState from "src/interfaces/Asset/IState";



export function getStateRequest(): Promise<AxiosResponse<IState[]>> {
  return RequestService.axios.get(EndPoints.returning + "/ReturningState");
}
