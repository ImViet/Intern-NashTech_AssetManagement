import React, { lazy, Suspense, useEffect } from "react";
import {
  Routes,
  Route
} from "react-router-dom";

import { HOME } from '../constants/pages';
import InLineLoader from "../components/InlineLoader";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import LayoutRoute from "./LayoutRoute";
import Roles from "src/constants/roles";
import { me } from "src/containers/Authorize/reducer";

const Home = lazy(() => import('../containers/Home'));
const Login = lazy(() => import('../containers/Authorize'));
const NotFound = lazy(() => import("../containers/NotFound"));

const SusspenseLoading = ({ children }) => (
  <Suspense fallback={<InLineLoader />}>
    {children}
  </Suspense>
);

const AppRoutes = () => {
  const { isAuth, account } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {

  }, []);

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
      </Routes>
    </SusspenseLoading>
  )
};

export default AppRoutes;
