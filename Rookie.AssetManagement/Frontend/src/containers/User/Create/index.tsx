import React, { useState, useEffect } from "react";

import UserFormContainer from "../UserForm";

const CreateUserContainer = () => {
  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">Create New User</div>

      <div className="row">
        <UserFormContainer/>
      </div>
    </div>
  );
};

export default CreateUserContainer;
