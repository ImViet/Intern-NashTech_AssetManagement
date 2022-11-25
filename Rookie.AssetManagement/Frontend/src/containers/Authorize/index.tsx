
import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Form, Formik } from 'formik';

import Header from "../Layout/Header";
import TextField from "src/components/FormInputs/TextField";
import ILoginModel from "src/interfaces/ILoginModel";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { cleanUp, login } from "./reducer";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { HOME, LOGIN } from "src/constants/pages";
import TextFieldPassword from "src/components/FormInputs/TextFieldPassword";

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required(""),
  password: Yup.string().required(""),
});

const initialValues: ILoginModel = {
  userName: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuth } = useAppSelector(state => state.authReducer);


  useEffect(() => {
    if (isAuth) {
      navigate(HOME)
    }
  }, [isAuth]);

  useEffect(() => {
    return () => {
      dispatch(cleanUp());
    }
  }, []);

  const isDisableLoginButton = (loading, isValid, touched) => {

    if (loading) {
      return true;
    }

    if (Object.keys(touched).length < 1) {
      return true;
    }

    if (!isValid) {
      return true
    }

    return false;
  }

  return (
    <>
      <div className='container login-modal'>
        <Modal.Dialog
          aria-labelledby="login-modal"
        >
          <Modal.Header >
            <Modal.Title id="login-modal" className="text-center h5 w-100">
              Welcome to Online Asset Management
            </Modal.Title>

          </Modal.Header>

          <Modal.Body>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                dispatch(login(values));
              }}
              validationSchema={LoginSchema}
            >
              {({ isValid, touched }) => (
                <Form className='intro-y'>
                  <TextField name="userName" label="Username" isrequired={true} />
                  <TextFieldPassword name="password" label="Password" isrequired={true} />

                  {error && (
                    <div className="invalid text-center">
                      {error}
                    </div>
                  )}

                  <div className="text-right mt-2 pb-3">
                    <button className="btn btn-danger"
                      type="submit" disabled={isDisableLoginButton(loading, isValid, touched)}>
                      Login
                      {(loading) && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </>
  );
};

export default Login;
