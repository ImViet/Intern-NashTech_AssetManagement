import React from "react";
import { NavLink } from "react-router-dom";
import { ASSET_LIST_LINK, ASSIGNMENT_LIST_LINK, HOME, REPORT_LIST_LINK, RETURNING_LIST_LINK, USER_LIST_LINK } from "src/constants/pages";
import Roles from "src/constants/roles";
import { useAppSelector } from "src/hooks/redux";

const SideBar = () => {
  const { account } = useAppSelector((state) => state.authReducer);

  return (
    <>
      {(account?.type.toUpperCase() === "ADMIN") ? (
        <div className="nav-left mb-5">
          <img src="/images/Logo_lk.png" alt="logo" />
          <p className="user intro-x">Online Asset Management</p>
          <NavLink className="navItem intro-x" to={HOME}>
            <button className="btnCustom">Home</button>
          </NavLink>
          <NavLink className="navItem intro-x" to={USER_LIST_LINK}>
            <button className="btnCustom">Manage User</button>
          </NavLink>
          <NavLink className="navItem intro-x" to={ASSET_LIST_LINK}>
            <button className="btnCustom">Manage Asset</button>
          </NavLink>
          <NavLink className="navItem intro-x" to={ASSIGNMENT_LIST_LINK}>
            <button className="btnCustom">Manage Assignment</button>
          </NavLink>
          <NavLink className="navItem intro-x" to={RETURNING_LIST_LINK}>
            <button className="btnCustom">Request for Returning</button>
          </NavLink>
          <NavLink className="navItem intro-x" to={REPORT_LIST_LINK}>
            <button className="btnCustom">Report</button>
          </NavLink>
        </div>
      ) : (
        <div className="nav-left mb-5">
          <img src="/images/Logo_lk.png" alt="logo" />
          <p className="user intro-x">Online Asset Management</p>
          <NavLink className="navItem intro-x" to={HOME}>
            <button className="btnCustom">Home</button>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default SideBar;
