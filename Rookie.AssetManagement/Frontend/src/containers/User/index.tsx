import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { CREATE_USER, USER_LIST, EDIT_USER } from "src/constants/pages";
import LayoutRoute from "src/routes/LayoutRoute";

const NotFound = lazy(() => import("../NotFound"));
const ListUser = lazy(() => import("./List"));
const CreateUser = lazy(() => import("./Create"));
const User = () => {
  return (
    <Routes>
      <Route path={USER_LIST} element={<ListUser />} />
      <Route path={CREATE_USER} element={<CreateUser />} />
    </Routes>
  );
};

export default User;
