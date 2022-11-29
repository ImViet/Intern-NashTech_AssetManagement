import { takeLatest } from "redux-saga/effects";
import { createAsset, getAssetList, getCategory, getState } from "../reducer";
import { handleCreateAsset, handleGetAssetList, handleGetCategoryList, handleGetStateList } from "./handles";

export default function* AssetSagas() {
    yield takeLatest(getAssetList.type, handleGetAssetList);
    yield takeLatest(getCategory.type, handleGetCategoryList);
    yield takeLatest(getState.type, handleGetStateList);
    yield takeLatest(createAsset.type,handleCreateAsset);
}