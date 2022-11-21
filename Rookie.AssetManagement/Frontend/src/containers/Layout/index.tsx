import React from "react";
import { NotificationContainer } from 'react-notifications';

import Header from "./Header";
import SideBar from "./SideBar";
import { Route, Outlet } from "react-router-dom";

const Layout = ({ children, showSideBar = true }) => {
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

          <div className={`${showSideBar?"col-lg-9 col-md-7":"col-12"} ms-5`}>
            {children}
          </div>
        </div>

      </div>
    </>
  );
};

export default Layout;
