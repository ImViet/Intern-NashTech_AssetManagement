import React, { useState, useEffect } from "react";
import AssignmentFormContainer from "../AssignmentForm";

const CreateAssignmentContainer = () => {
  return (
    <div className="ml-5">
      <div className="primaryColor text-title intro-x">Create New Assignment</div>

      <div className="row">
        <AssignmentFormContainer/>
      </div>
    </div>
  );
};

export default CreateAssignmentContainer;
