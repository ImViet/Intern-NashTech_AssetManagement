import React, { useState, useEffect } from "react";

import UserFormContainer from "../UserForm";

const UpdateUserContainer = () => {
  
  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">Update User</div>

      <div className="row">
        <UserFormContainer/>
      </div>
    </div>
  );
};

export default UpdateUserContainer;
