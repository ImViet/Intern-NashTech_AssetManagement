import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { Status } from "src/constants/status";
import {
  setAssetFormData,
  setState,
  setStatus,
} from "src/containers/Asset/reducer";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import IError from "src/interfaces/IError";
import ISelectOption from "src/interfaces/ISelectOption";
import { toUTC } from "src/utils/formatDateTime";
import {
  setAssetList,
  setCategory,
  CreateAction,
  UpdateAction,
  setActionResult,
} from "../reducer";
import {
  createAssetRequest,
  getAssetFormDataRequest,
  getAssetsRequest,
  getCategoryRequest,
  getStateRequest,
  updateAssetRequest,
} from "./requests";

export function* handleCreateAsset(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    console.log(formValues);

    formValues.InstalledDate = toUTC(formValues.InstalledDate);

    const { data } = yield call(createAssetRequest, formValues);

    data.InstalledDate = new Date(data.InstalledDate);

    if (data) {
      handleResult(true);
    }

    yield put(setActionResult(data));
  } catch (error: any) {
    const errors = error.response.data.errors;
    const firstError = errors[Object.keys(errors)[0]][0];
    handleResult(false, firstError);
    yield put(
      setStatus({
        status: Status.Failed,
        error: firstError,
      })
    );
  }
}

export function* handleUpdateAsset(action: PayloadAction<UpdateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    console.log("handleUpdateAsset");
    console.log(formValues);

    const { data } = yield call(updateAssetRequest, formValues);

    data.InstalledDate = new Date(data.InstalledDate);

    if (data) {
      handleResult(true, data.AssetName);
    }

    yield put(setActionResult(data));
  } catch (error: any) {
    const errors = error.response.data.errors;
    const firstError = errors[Object.keys(errors)[0]][0];
    handleResult(false, firstError);
    yield put(
      setStatus({
        status: Status.Failed,
        error: firstError,
      })
    );
  }
}

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

export function* handleGetAssetForm(action: PayloadAction<number>) {
  const id = action.payload;

  try {
    const { data } = yield call(getAssetFormDataRequest, id);
    data.installedDate = new Date(data.installedDate);
    yield put(setAssetFormData(data));
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
    const options = [
      {
        id: 1,
        label: "ALL",
        value: "",
      },
    ];
    data.forEach((cate, index) => {
      options.push({
        id: index + 2,
        label: cate.categoryName,
        value: cate.id,
      });
    });
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
    const options = [
      {
        id: 1,
        label: "ALL",
        value: "",
      },
    ];
    data.forEach((state, index) => {
      options.push({
        id: index + 2,
        label: state.stateName,
        value: state.id,
      });
    });
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
