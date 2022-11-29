import { takeLatest } from "redux-saga/effects";
import { getAssetList, getCategory, getState } from "../reducer";
import { handleGetAssetList, handleGetCategoryList, handleGetStateList } from "./handles";

export default function* AssetSagas() {
    yield takeLatest(getAssetList.type, handleGetAssetList);
    yield takeLatest(getCategory.type, handleGetCategoryList);
    yield takeLatest(getState.type, handleGetStateList);
}