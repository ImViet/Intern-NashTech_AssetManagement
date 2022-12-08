import React, { useEffect, useState, lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ASSIGNMENT_LIST, LOGIN, CREATE_ASSIGNMENT, EDIT_ASSIGNMENT } from "src/constants/pages";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { me } from "../Authorize/reducer";

const CreateAssignment = lazy(() => import("./Create"));
const ListAssignment = lazy(() => import("./List"));
const UpdateAssignment = lazy(() => import("./Update"));

const Assignment = () => {
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
        <Routes>
            <Route path={ASSIGNMENT_LIST} element={<ListAssignment />} />
            <Route path={CREATE_ASSIGNMENT} element={<CreateAssignment />} />
            <Route path={EDIT_ASSIGNMENT} element={<UpdateAssignment />} />
        </Routes>
    );
};

export default Assignment;
