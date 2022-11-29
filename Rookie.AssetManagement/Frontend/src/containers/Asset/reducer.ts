import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStatusType } from "src/constants/status";

import IError from "src/interfaces/IError";
import IPagedModel from "src/interfaces/IPagedModel";
import IAsset from "src/interfaces/Asset/IAsset";
import IQueryAssetModel from "src/interfaces/Asset/IQueryAssetModel";
import IAssetForm from "src/interfaces/Asset/IAssetForm";

type AssetState = {
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
  createAsset,
  updateAsset,
  setAssetList,
  getAssetList,
  setStatus
} = AssetReducerSlice.actions;

export default AssetReducerSlice.reducer;
