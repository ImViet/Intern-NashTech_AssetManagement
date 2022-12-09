import { AxiosResponse } from "axios";
import IAsset from "src/interfaces/Asset/IAsset";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import RequestService from "src/services/request";
import qs from "qs";
import EndPoints from "src/constants/endpoints";
import ICategory from "src/interfaces/Category/ICategory";
import IState from "src/interfaces/Asset/IState";
import IAssetForm from "src/interfaces/Asset/IAssetForm";

export function createAssetRequest(
  assetForm: IAssetForm
): Promise<AxiosResponse<IAsset>> {
  return RequestService.axios.post(EndPoints.asset, assetForm, {
    paramsSerializer: (params) => JSON.stringify(params),
  });
}

export function getAssetsRequest(
  assetQuery: IQueryAssetModel
): Promise<AxiosResponse<IAsset[]>> {
  return RequestService.axios.get(EndPoints.searchAsset, {
    params: assetQuery,
    paramsSerializer: (params) => qs.stringify(params),
  });
}
export function updateAssetRequest(
  assetForm: IAssetForm
): Promise<AxiosResponse<IAsset>> {
  return RequestService.axios.put(EndPoints.asset, assetForm, {
    paramsSerializer: (params) => JSON.stringify(params),
  });
}
export function getAssetFormDataRequest(
  id: number
): Promise<AxiosResponse<IAssetForm>> {
  return RequestService.axios.get(`${EndPoints.searchAsset}/${id}`);
}
export function getAssetByIdRequest(
  id: number
): Promise<AxiosResponse<IAsset>> {
  return RequestService.axios.get(EndPoints.asset + "/" + id);
}

export function getCategoryRequest(): Promise<AxiosResponse<ICategory[]>> {
  return RequestService.axios.get(EndPoints.category);
}

export function getStateRequest(): Promise<AxiosResponse<IState[]>> {
  return RequestService.axios.get(EndPoints.asset + "/GetAssetState");
}

export function disableAssetRequest(
  id: number
): Promise<AxiosResponse<IAsset>> {
  return RequestService.axios.delete(EndPoints.asset + "/" + id);
}
