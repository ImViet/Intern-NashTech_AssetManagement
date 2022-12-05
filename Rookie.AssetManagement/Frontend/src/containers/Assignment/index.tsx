import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ASSIGNMENT_LIST, LOGIN } from "src/constants/pages";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { me } from "../Authorize/reducer";
import ListAssignment from "./List";

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
            {/* <Route path={CREATE_ASSET} element={<CreateAsset />} />
        <Route path={EDIT_ASSET} element={<UpdateAsset />} /> */}
        </Routes>
    );
};

export default Assignment;
