import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IAsset from "src/interfaces/Asset/IAsset";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import ICategory from "src/interfaces/Category/ICategory";
import ISelectOption from "src/interfaces/ISelectOption";

type AssetState = {
  FilterAssetCategoryOptions: ISelectOption[];
  loading: boolean;
  assetResult: IAsset | null;
  actionResult: IAsset | null;
  assets: IPagedModel<IAsset> | null;
  status?: number;
  error?: IError;
};

const initialState: AssetState = {
  assets: null,
  loading: false,
  assetResult: null,
  actionResult: null,
  FilterAssetCategoryOptions:[]
};

const AssetReducerSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    getAssetList: (state, action: PayloadAction<IQueryAssetModel>): AssetState => {
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
      return{
        ...state,
        loading: true,
      };
    },
    setCategory: (state, action: PayloadAction<ISelectOption[]>) => {
      const categoryOptions = action.payload;
      return{
        ...state,
        FilterAssetCategoryOptions:categoryOptions,
        loading: false,
      };
    }
  },
});

export const {
  setAssetList,
  getAssetList,
  getCategory,
  setCategory,
  setStatus
} = AssetReducerSlice.actions;

export default AssetReducerSlice.reducer;
