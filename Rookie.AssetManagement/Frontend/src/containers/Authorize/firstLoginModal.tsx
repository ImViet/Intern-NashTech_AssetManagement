import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Form, Formik } from 'formik';

import Header from "../Layout/Header";
import TextField from "src/components/FormInputs/TextField";
import ILoginModel from "src/interfaces/ILoginModel";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { changePasswordFirstLogin, cleanUp, login } from "./reducer";
import * as Yup from 'yup';
import IChangePasswordFirstLogin from "src/interfaces/IChangePasswordFirstLogin";
import { handleChangePasswordFirstLogin } from "./sagas/handles";
 
const LoginSchema = Yup.object().shape({
  passwordNew: Yup.string().required('Required'),
});

const initialValues: IChangePasswordFirstLogin = {
  passwordNew: '',
}

const FirstLoginModal = ({show}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.authReducer);

  useEffect(() => {
    return () => {
      dispatch(cleanUp());
    }
  }, []);

  const isDisableSaveButton = (loading, isValid)=>{
    
    if(loading){
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
        <Modal
          show={show}
          aria-labelledby="login-modal"
        >
          <Modal.Header >
            <Modal.Title id="login-modal">
              Change Password
          </Modal.Title>

          </Modal.Header>

          <Modal.Body>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                dispatch(changePasswordFirstLogin(values));
              }}
              validationSchema={LoginSchema}
            >
              {({ isValid, touched }) => (
                <Form className='intro-y'>
                  <p>This is the first time you logged in you have to change you password to continue</p>
                  <TextField name="passwordNew" label="New Password" type="password" isrequired={true} />

                  {error?.error && (
                    <div className="invalid">
                      {error.message}
                    </div>
                  )}

                  <div className="text-right mt-5">
                    <button className="btn btn-danger"
                      type="submit" disabled={isDisableSaveButton(loading, isValid)}>
                      Save
                      {(loading) && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default FirstLoginModal;
