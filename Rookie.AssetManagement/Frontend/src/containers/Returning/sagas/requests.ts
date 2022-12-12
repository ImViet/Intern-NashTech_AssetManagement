import { AxiosResponse } from "axios";
import RequestService from "src/services/request";
import EndPoints from "src/constants/endpoints";
import IState from "src/interfaces/Asset/IState";
import qs from "qs";
import IQueryReturningModel from "src/interfaces/Returning/IQueryReturningModel";
import IReturning from "src/interfaces/Returning/IReturning";

export function getReturningRequest(
  returningQuery: IQueryReturningModel
): Promise<AxiosResponse<IReturning[]>> {
  return RequestService.axios.get(EndPoints.searchReturnRequest, {
    params: returningQuery,    
    paramsSerializer: (params) => qs.stringify(params),
  });
}

export function getStateRequest(): Promise<AxiosResponse<IState[]>> {
  return RequestService.axios.get(EndPoints.returning + "/ReturningState");
}
