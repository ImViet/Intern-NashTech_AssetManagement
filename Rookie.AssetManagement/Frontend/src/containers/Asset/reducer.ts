import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IAsset from "src/interfaces/Asset/IAsset";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import ICategory from "src/interfaces/Category/ICategory";
import ISelectOption from "src/interfaces/ISelectOption";
import IAssetForm from "src/interfaces/Asset/IAssetForm";

type AssetState = {
  FilterAssetCategoryOptions: ISelectOption[];
  FilterAssetStateOptions: ISelectOption[];
  loading: boolean;
  assetResult: IAsset | null;
  actionResult: IAsset | null;
  assets: IPagedModel<IAsset> | null;
  status?: number;
  error?: IError;
};

export type CreateAction = {
  handleResult: Function;
  formValues: IAssetForm;
};

export type UpdateAction = {
  handleResult: Function;
  formValues: IAssetForm;
};

const initialState: AssetState = {
  assets: null,
  loading: false,
  assetResult: null,
  actionResult: null,
  FilterAssetCategoryOptions: [],
  FilterAssetStateOptions: [],
};

const AssetReducerSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    createAsset: (state, action: PayloadAction<CreateAction>): AssetState => {
      return {
        ...state,
        loading: true,
      };
    },
    updateAsset: (state, action: PayloadAction<UpdateAction>): AssetState => {
      return {
        ...state,
        loading: true,
      };
    },

    getAssetList: (
      state,
      action: PayloadAction<IQueryAssetModel>
    ): AssetState => {
      return {
        ...state,
        loading: true,
      };
    },
    setAssetList: (
      state,
      action: PayloadAction<IPagedModel<IAsset>>
    ): AssetState => {
      const assets = action.payload;

      return {
        ...state,
        assets,
        loading: false,
      };
    },
    setStatus: (state, action: PayloadAction<SetStatusType>) => {
      const { status, error } = action.payload;
      return {
        ...state,
        status,
        error,
        loading: false,
      };
    },
    getCategory: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    setCategory: (state, action: PayloadAction<ISelectOption[]>) => {
      const categoryOptions = action.payload;
      return {
        ...state,
        FilterAssetCategoryOptions: categoryOptions,
        loading: false,
      };
    },
    getState: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    setState: (state, action: PayloadAction<ISelectOption[]>) => {
      const stateOptions = action.payload;
      return {
        ...state,
        FilterAssetStateOptions: stateOptions,
        loading: false,
      };
    },
    setActionResult: (state, action: PayloadAction<IAsset>): AssetState => {
      const actionResult = action.payload;

      return {
        ...state,
        actionResult,
        loading: false,
      };
    },
  },
});

export const {
  createAsset,
  updateAsset,
  setActionResult,
  setAssetList,
  getAssetList,
  getCategory,
  setCategory,
  getState,
  setState,
  setStatus,
} = AssetReducerSlice.actions;

export default AssetReducerSlice.reducer;
