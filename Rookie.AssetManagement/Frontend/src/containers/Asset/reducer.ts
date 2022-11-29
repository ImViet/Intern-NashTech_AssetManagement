import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IAsset from "src/interfaces/Asset/IAsset";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";

type AssetState = {
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
  },
});

export const {
  setAssetList,
  getAssetList,
  setStatus
} = AssetReducerSlice.actions;

export default AssetReducerSlice.reducer;
