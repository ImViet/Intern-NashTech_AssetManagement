import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { CREATE_ASSET, ASSET_LIST, EDIT_ASSET } from "src/constants/pages";
import LayoutRoute from "src/routes/LayoutRoute";

const NotFound = lazy(() => import("../NotFound"));
const ListAsset = lazy(() => import("./List"));
// const CreateUser = lazy(() => import("./Create"));
// const UpdateUser = lazy(() => import("./Update"));
const User = () => {
  return (
    <Routes>
      <Route path={ASSET_LIST} element={<ListAsset />} />
      {/* <Route path={CREATE_USER} element={<CreateUser />} />
      <Route path={EDIT_USER} element={<UpdateUser />} /> */}
    </Routes>
  );
};

export default User;