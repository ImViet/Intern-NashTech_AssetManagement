import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "src/constants/pages";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { me } from "../Authorize/reducer";

const Home = () => {
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
      <div className='primaryColor text-title intro-x'>
        My Assignment
      </div>
    </>
  );
};

export default Home;
