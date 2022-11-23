import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { LOGIN } from "src/constants/pages";
import Layout from "src/containers/Layout";
import { useAppSelector } from "src/hooks/redux";
import InLineLoader from "../components/InlineLoader";

export default function AdminRoute({ children, ...rest }) {
    const { isAuth, account } = useAppSelector(state => state.authReducer);
    return (
        <>
            {(account?.type.toUpperCase() === "ADMIN") ?
                (<Layout>
                    {children}
                </Layout>
                )
                : (
                    <Navigate to={'/unAuthorization'} />
                )
            }
        </>

    );
}