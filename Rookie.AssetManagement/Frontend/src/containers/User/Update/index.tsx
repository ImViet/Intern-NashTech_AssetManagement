import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Gender from "src/constants/gender";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import IUserForm from "src/interfaces/User/IUserForm";
import { getUser } from "../reducer";

import UserFormContainer from "../UserForm";

const UpdateUserContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { userResult } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getUser(Number(id)))
  }, [])

  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">Update User</div>

      <div className="row">
        {userResult && <UserFormContainer initialUserForm={userResult}/>}
      </div>
    </div>
  );
};

export default UpdateUserContainer;
