import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Gender from "src/constants/gender";
import { useAppSelector } from "src/hooks/redux";
import IUserForm from "src/interfaces/User/IUserForm";

import UserFormContainer from "../UserForm";

const UpdateUserContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { users, loading } = useAppSelector((state) => state.userReducer);
  const [user, setUser] = useState(undefined as IUserForm | undefined);
  const existUser = users?.items.find(item => item.id === Number(id));

  useEffect(()=>{
    if (existUser) {
      setUser({
        userId: existUser.id,
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        dateOfBirth: new Date(existUser.dateOfBirth),
        gender: existUser.gender,
        joinedDate: new Date(existUser.joinedDate),
        type: existUser.type  
      });
    }
  }, [])
  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">Update User</div>

      <div className="row">
        {user && <UserFormContainer initialUserForm={user}/>}
      </div>
    </div>
  );
};

export default UpdateUserContainer;
