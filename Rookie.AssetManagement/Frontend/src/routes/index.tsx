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
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path={ASSET}
          element={
            <PrivateRoute>
              <Asset />
            </PrivateRoute>
          }
        />
        <Route
          path={ASSIGNMENT}
          element={
            <PrivateRoute>
              <Assignment />
            </PrivateRoute>
          }
        />
        <Route
          path={RETURNING}
          element={
            <PrivateRoute>
              <Returning />
            </PrivateRoute>
          }
        />
        <Route
          path={REPORT}
          element={
            <PrivateRoute>
              <Report />
            </PrivateRoute>
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
      </Routes>
    </SusspenseLoading>
  );
};

export default AppRoutes;
