import React, { useEffect, useState, lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LOGIN, RETURNING_LIST } from "src/constants/pages";

import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { me } from "../Authorize/reducer";

const ListReturning = lazy(() => import("./List"));

const Returning = () => {
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
        <>
            <Routes>
                <Route path={RETURNING_LIST} element={<ListReturning />} />
            </Routes>
        </>
    );
};

export default Returning;
