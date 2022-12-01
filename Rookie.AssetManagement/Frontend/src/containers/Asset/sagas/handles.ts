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
  DisableAction,
} from "../reducer";
import {
  createAssetRequest,
  getAssetFormDataRequest,
  getAssetsRequest,
  getCategoryRequest,
  getStateRequest,
  updateAssetRequest,
  disableAssetRequest,
} from "./requests";

export function* handleCreateAsset(action: PayloadAction<CreateAction>) {
  const { handleResult, formValues } = action.payload;
  try {
    console.log(formValues);

    formValues.installedDate = toUTC(formValues.installedDate);

    const { data } = yield call(createAssetRequest, formValues);

    data.InstalledDate = new Date(data.InstalledDate);

    if (data) {
      handleResult(true);
    }

    yield put(setActionResult(data));
  } catch (error: any) {
    const errorModel = error.response.data;
    handleResult(false, errorModel);
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: "",
        },
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
    const errorModel = error.response.data;
    handleResult(false, errorModel);
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: "",
        },
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
    const message = error.response.data;
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: message,
        },
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
    const message = error.response.data;
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: message,
        },
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
        value: "ALL",
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
    const message = error.response.data;
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: message,
        },
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
        value: "ALL",
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
    const message = error.response.data;
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: message,
        },
      })
    );
  }
}

export function* handleDisableAsset(action: PayloadAction<DisableAction>) {
  const { id, handleResult } = action.payload;
  try {
    const { data } = yield call(disableAssetRequest, id);

    if (data) {
      handleResult(true, "");
    }
  } catch (error: any) {
    const message = error.response.data;
    handleResult(false, message);
    yield put(
      setStatus({
        status: Status.Failed,
        error: {
          error: true,
          message: message,
        },
      })
    );
  }
}
