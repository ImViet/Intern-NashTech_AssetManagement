import { takeLatest } from "redux-saga/effects";
import {
  createAsset,
  disableAsset,
  getAssetFormData,
  getAssetList,
  getCategory,
  getState,
  updateAsset,
} from "../reducer";
import {
  handleCreateAsset,
  handleDisableAsset,
  handleGetAssetForm,
  handleGetAssetList,
  handleGetCategoryList,
  handleGetStateList,
  handleUpdateAsset,
} from "./handles";

export default function* AssetSagas() {
  yield takeLatest(getAssetList.type, handleGetAssetList);
  yield takeLatest(getCategory.type, handleGetCategoryList);
  yield takeLatest(getState.type, handleGetStateList);
  yield takeLatest(createAsset.type, handleCreateAsset);
  yield takeLatest(getAssetFormData.type, handleGetAssetForm);
  yield takeLatest(updateAsset.type, handleUpdateAsset);
  yield takeLatest(disableAsset.type, handleDisableAsset);
}
