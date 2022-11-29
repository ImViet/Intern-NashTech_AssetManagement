import { takeLatest } from "redux-saga/effects";
import { getAssetList } from "../reducer";
import { handleGetAssetList } from "./handles";

export default function* AssetSagas() {
    yield takeLatest(getAssetList.type, handleGetAssetList);
}