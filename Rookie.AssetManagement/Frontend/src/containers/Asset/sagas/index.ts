import { takeLatest } from "redux-saga/effects";
import { getAssetList, getCategory } from "../reducer";
import { handleGetAssetList, handleGetCategoryList } from "./handles";

export default function* AssetSagas() {
    yield takeLatest(getAssetList.type, handleGetAssetList);
    yield takeLatest(getCategory.type, handleGetCategoryList);
}