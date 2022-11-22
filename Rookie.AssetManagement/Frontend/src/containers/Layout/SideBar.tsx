import React from "react";
import { NavLink } from "react-router-dom";
import { HOME, USER_LIST_LINK } from "src/constants/pages";
import Roles from "src/constants/roles";
import { useAppSelector } from "src/hooks/redux";

const SideBar = () => {
  const { account } = useAppSelector((state) => state.authReducer);

  return (
    <>
      {(account?.type === "admin") ? (
        <div>
          <img src="/images/Logo_lk.png" alt="logo" />
          <p className="user intro-x">Online Asset Management</p>
          <NavLink className="navItem intro-x" to={HOME}>
            <button className="btnCustom">Home</button>
          </NavLink>
          <NavLink className="navItem intro-x" to={USER_LIST_LINK}>
            <button className="btnCustom">Manage User</button>
          </NavLink>
        </div>
      ) : (
        <div className="nav-left mb-5">
          <img src="/images/Logo_lk.png" alt="logo" />
          <p className="user intro-x">Online Asset Management</p>
          <NavLink className="navItem intro-x" to={HOME}>
            <button className="btnCustom">Home</button>
          </NavLink>
          <NavLink className="navItem intro-x" to={USER_LIST_LINK}>
            <button className="btnCustom">Manage User</button>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default SideBar;
