import React, { Suspense, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { HOME, LOGIN } from "src/constants/pages";
import Layout from "src/containers/Layout";
import { useAppSelector } from "src/hooks/redux";
import InLineLoader from "../components/InlineLoader";

export default function AdminRoute({ children, ...rest }) {
    const { isAuth, account } = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuth){
            navigate(LOGIN)
        }else if(account && account.type.toUpperCase() !== "ADMIN"){
            navigate(HOME)
        }
    }, [account])
    
    return (
        <>
            <Layout>
                    {children}
            </Layout>
        </>
    );
}