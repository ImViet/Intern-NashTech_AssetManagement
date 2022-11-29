import { AxiosResponse } from "axios";
import IAsset from "src/interfaces/Asset/IAsset";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import RequestService from "src/services/request";
import qs from "qs";
import EndPoints from "src/constants/endpoints";


export function getAssetsRequest(
    assetQuery: IQueryAssetModel
  ): Promise<AxiosResponse<IAsset[]>> {
    return RequestService.axios.get(EndPoints.searchAsset, {
      params: assetQuery,
      paramsSerializer: (params) => qs.stringify(params),
    });
  }