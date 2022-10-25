import React, { Suspense } from "react";
import { Route, Outlet } from "react-router-dom";

import InLineLoader from "../components/InlineLoader";
import Layout from "src/containers/Layout";

export default function PublicRoute({ children, ...rest }) {
    return (
        <Layout>
            {children}
        </Layout>
    );
}