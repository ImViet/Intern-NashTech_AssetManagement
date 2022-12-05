import { takeLatest } from "redux-saga/effects";
import {
  createAsset,
  disableAsset,
  getAssetFormData,
  getAssetList,
  getCategory,
  getState,
  getAsset,
  updateAsset,
} from "../reducer";
import {
  handleCreateAsset,
  handleDisableAsset,
  handleGetAssetForm,
  handleGetAssetList,
  handleGetCategoryList,
  handleGetAssetById,
  handleGetStateList,
  handleUpdateAsset,
} from "./handles";

export default function* AssetSagas() {
  yield takeLatest(getAssetList.type, handleGetAssetList);
  yield takeLatest(getCategory.type, handleGetCategoryList);
  yield takeLatest(getState.type, handleGetStateList);
  yield takeLatest(createAsset.type, handleCreateAsset);
  yield takeLatest(getAssetFormData.type, handleGetAssetForm);
  yield takeLatest(getAsset.type, handleGetAssetById);
  yield takeLatest(updateAsset.type, handleUpdateAsset);
  yield takeLatest(disableAsset.type, handleDisableAsset);
}
