import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Form, Formik } from 'formik';

import Header from "../Layout/Header";
import TextField from "src/components/FormInputs/TextField";
import ILoginModel from "src/interfaces/ILoginModel";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { cleanUp, login } from "./reducer";
import * as Yup from 'yup';
 
const LoginSchema = Yup.object().shape({
  userName: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues: ILoginModel = {
  userName: '',
  password: '',
}

const Login = () => {
  const [isShow, setShow] = useState(true);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.authReducer);

  const handleHide = () => {
    setShow(false);
  }

  useEffect(() => {
    return () => {
      dispatch(cleanUp());
    }
  }, []);

  const isDisableLoginButton = (loading, isValid,touched)=>{
    
    if(loading){
      return true;
    }

    if(Object.keys(touched).length < 1){
      return true;
    }

    if(!isValid){
      return true
    }

    return false;
  }

  return (
    <>
      <div className='container'>
        <Modal.Dialog
          aria-labelledby="login-modal"
        >
          <Modal.Header >
            <Modal.Title id="login-modal">
              Login
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
                  <TextField name="userName" label="Username" placeholder="john" isrequired={true}/>
                  <TextField name="password" label="Password" type="password" isrequired={true} />

                  {error?.error && (
                    <div className="invalid">
                      {error.message}
                    </div>
                  )}

                  <div className="text-center mt-5">
                    <button className="btn btn-danger"
                      type="submit" disabled={isDisableLoginButton(loading, isValid,touched)}>
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
