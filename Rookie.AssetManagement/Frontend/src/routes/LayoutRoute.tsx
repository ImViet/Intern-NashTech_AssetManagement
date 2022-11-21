import React, { Suspense } from "react";
import { Route, Outlet } from "react-router-dom";

import InLineLoader from "../components/InlineLoader";
import Layout from "src/containers/Layout";

export default function PublicRoute({ children, showSideBar = true }) {
    return (
        <Layout showSideBar={showSideBar}>
            {children}
        </Layout>
    );
}