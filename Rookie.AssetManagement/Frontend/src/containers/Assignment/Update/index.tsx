import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ASSIGNMENT_LIST_LINK } from "src/constants/pages";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import AssignmentFormContainer from "../AssignmentForm";
import { getAssignmentFormData } from "../reducer";

const UpdateAssignmentContainer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { assignmentFormData } = useAppSelector((state) => state.assignmentReducer);
    const dispatch = useAppDispatch();
    useEffect(()=>{
      dispatch(getAssignmentFormData(Number(id)))
    }, [])

    useEffect(()=>{
      if(assignmentFormData?.state === 6){
        navigate(ASSIGNMENT_LIST_LINK)
      }
    }, [assignmentFormData?.state])


    return (
      <div className="ml-5">
        <div className="primaryColor text-title intro-x">Edit Assignment</div>
  
        <div className="row">
        {assignmentFormData && <AssignmentFormContainer initialAssignmentForm={assignmentFormData}/>}
        </div>
      </div>
    );
  };
  
  export default UpdateAssignmentContainer; 
