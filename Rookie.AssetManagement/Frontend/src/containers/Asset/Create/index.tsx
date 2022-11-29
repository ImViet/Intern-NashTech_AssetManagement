import React, { useState, useEffect } from "react";

import AssetFormContainer from "../AssetForm";



const CreateUserContainer = () => {
  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">Create New Asset</div>

      <div className="row">
        <AssetFormContainer/>
      </div>
    </div>
  );
};

export default CreateUserContainer;
