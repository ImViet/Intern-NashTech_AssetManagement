import React, { useEffect, useState } from "react";
import { NotificationContainer } from 'react-notifications';

import Header from "./Header";
import SideBar from "./SideBar";
import { Route, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import FirstLoginModal from "../Authorize/firstLoginModal";
import { me } from "../Authorize/reducer";
import { LOGIN } from "src/constants/pages";

const Layout = ({ children, showSideBar = true }) => {
  const { isAuth, account } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      dispatch(me());
    } else {
      navigate(LOGIN)
    }
  }, [isAuth]);

  return (
    <>
      <NotificationContainer />
      <Header />

      <div className="container-lg-min container-fluid">
        <div className="row mt-5">

          {showSideBar && (
            <div className="col-lg-2 col-md-4 col-12 mr-5">
              <SideBar />
            </div>
          )}

          <div className={`${showSideBar ? "col-lg-9 col-md-7" : "col-12"} ms-5`}>
            {children}
          </div>
        </div>

      </div>
      <FirstLoginModal show={account?.isNewUser} />
    </>
  );
};

export default Layout;
