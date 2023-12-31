import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { CREATE_ASSET, ASSET_LIST, EDIT_ASSET } from "src/constants/pages";
import LayoutRoute from "src/routes/LayoutRoute";

const NotFound = lazy(() => import("../NotFound"));
const ListAsset = lazy(() => import("./List"));
const CreateAsset = lazy(() => import("./Create"));
const UpdateAsset = lazy(() => import("./Update"));

const Asset = () => {
  return (
    <Routes>
      <Route path={ASSET_LIST} element={<ListAsset />} />
      <Route path={CREATE_ASSET} element={<CreateAsset />} />
      <Route path={EDIT_ASSET} element={<UpdateAsset />} />
    </Routes>
  );
};

export default Asset;