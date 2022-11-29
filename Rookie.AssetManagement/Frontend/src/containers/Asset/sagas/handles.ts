import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import { setState, setStatus } from "src/containers/Asset/reducer";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import IError from "src/interfaces/IError";
import ISelectOption from "src/interfaces/ISelectOption";
import { setAssetList, setCategory } from "../reducer";
import { getAssetsRequest, getCategoryRequest, getStateRequest } from "./requests";

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

export function* handleGetCategoryList() {
  try {
    const { data } = yield call(getCategoryRequest);
    const options = [{
        id: 1, label: "ALL", value: ""
    }]
    data.forEach((cate, index) => {
      options.push({
        id: index + 2, label: cate.categoryName, value: cate.id 
      })
    })
    yield put(setCategory(options));
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

export function* handleGetStateList() {
  try {
    const { data } = yield call(getStateRequest);
    const options = [{
        id: 1, label: "ALL", value: ""
    }]
    data.forEach((state, index) => {
      options.push({
        id: index + 2, label: state.stateName, value: state.id 
      })
    })
    yield put(setState(options));
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