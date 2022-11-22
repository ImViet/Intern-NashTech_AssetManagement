import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { USER_PARENT_ROOT } from "src/constants/pages";

const CreateBrandContainer = () => {
  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">Create New User</div>

      <div className="row">
        <Link to={USER_PARENT_ROOT} className="btn btn-outline-secondary ml-2">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default CreateBrandContainer;
