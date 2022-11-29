import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import { setStatus } from "src/containers/Asset/reducer";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import IError from "src/interfaces/IError";
import { setAssetList } from "../reducer";
import { getAssetsRequest } from "./requests";

export function* handleGetAssetList(action: PayloadAction<IQueryAssetModel>) {
    const queryAssetModel = action.payload;
  
    try {
      const { data } = yield call(getAssetsRequest, queryAssetModel);
      yield put(setAssetList(data));
    } catch (error: any) {
      const errorModel = error.response.data as IError;
  
      yield put(
        setStatus({
          status: Status.Failed,
          error: errorModel,
        })
      );
    }
  }