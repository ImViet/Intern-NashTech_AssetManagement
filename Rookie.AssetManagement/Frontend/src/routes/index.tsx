import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import {
  HOME, LOGIN, USER, USER_LIST_LINK,
  ASSET,
  ASSIGNMENT,
  RETURNING,
  REPORT
} from "../constants/pages";
import InLineLoader from "../components/InlineLoader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import LayoutRoute from "./LayoutRoute";
import Roles from "src/constants/roles";
import { me } from "src/containers/Authorize/reducer";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UnAuthorization from "src/containers/UnAuthorization";

const Home = lazy(() => import("../containers/Home"));
const Login = lazy(() => import("../containers/Authorize"));
const User = lazy(() => import("../containers/User"));
const Asset = lazy(() => import("../containers/Asset"));
const Assignment = lazy(() => import("../containers/Assignment"));
const Returning = lazy(() => import("../containers/Returning"));
const Report = lazy(() => import("../containers/Report"));
const NotFound = lazy(() => import("../containers/NotFound"));

const SusspenseLoading = ({ children }) => (
  <Suspense fallback={<InLineLoader />}>{children}</Suspense>
);

const AppRoutes = () => {
  return (
    <SusspenseLoading>
      <Routes>
        <Route
          path={HOME}
          element={
            <LayoutRoute>
              <Home />
            </LayoutRoute>
          }
        />
        <Route
          path={USER}
          element={
            <AdminRoute>
              <User />
            </AdminRoute>
          }
        />
        <Route
          path={ASSET}
          element={
            <AdminRoute>
              <Asset />
            </AdminRoute>
          }
        />
        <Route
          path={ASSIGNMENT}
          element={
            <AdminRoute>
              <Assignment />
            </AdminRoute>
          }
        />
        <Route
          path={RETURNING}
          element={
            <AdminRoute>
              <Returning />
            </AdminRoute>
          }
        />
        <Route
          path={REPORT}
          element={
            <AdminRoute>
              <Report />
            </AdminRoute>
          }
        />
        <Route
          path={LOGIN}
          element={
            <LayoutRoute showSideBar={false}>
              <Login />
            </LayoutRoute>
          }
        />
        <Route
          path={"/*"}
          element={
            <NotFound />
          }
        />
        <Route
          path={"/unAuthorization"}
          element={
            <UnAuthorization />
          }
        />
      </Routes>
    </SusspenseLoading>
  );
};

export default AppRoutes;
