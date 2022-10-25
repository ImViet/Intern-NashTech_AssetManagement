import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { LOGIN } from "src/constants/pages";
import Layout from "src/containers/Layout";
import { useAppSelector } from "src/hooks/redux";
import InLineLoader from "../components/InlineLoader";

export default function PrivateRoute({ children, ...rest }) {
    const { isAuth } = useAppSelector(state => state.authReducer);

    return (
        isAuth ?
                <Layout>
                    <Outlet />
                </Layout>
            :   <Navigate to={LOGIN} />

    );
}