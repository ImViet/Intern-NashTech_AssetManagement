import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import Header from "src/containers/Layout/Header";
import TextField from "src/components/FormInputs/TextField";
import ILoginModel from "src/interfaces/ILoginModel";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { changePassword, cleanUp, login } from "src/containers/Authorize/reducer";

import * as Yup from 'yup';
import IChangePassword from "src/interfaces/IChangePassword";
import { handleChangePasswordFirstLogin } from "src/containers/Authorize/sagas/handles";
import TextFieldPassword from "src/components/FormInputs/TextFieldPassword";
import { HOME, USER, USER_PARENT_ROOT } from 'src/constants/pages';
 
const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required(""),
  newPassword: Yup.string().required(""),
});

const initialValues: IChangePassword = {
  currentPassword: '',
  newPassword: '',
}

const ChangePassword = ({show}) => {
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
          <div className="first-login-modal">
            <Modal.Header style={{paddingLeft:48, paddingRight:48 }}>
              <Modal.Title id="login-modal">
                Change Password
            </Modal.Title>

            </Modal.Header>
              <Modal.Body style={{paddingLeft:48, paddingRight:48 }}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    dispatch(changePassword(values));
                  }}
                  validationSchema={ChangePasswordSchema}
                >
                  {(actions) => (
                    <Form className='intro-y'>
                      <TextFieldPassword name="passwordOld" label="Old Password" isrequired={true} />
                      <TextFieldPassword name="passwordNew" label="New Password" isrequired={true} />
                      
                      {error && (
                        <div className="invalid text-center">
                          {error}
                        </div>
                      )}

                      <div className="text-right mt-5">
                        <button className="btn btn-danger"
                          type="submit" disabled={!(actions.dirty && actions.isValid)}>
                          Save
                          {(loading) && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
                        </button>
                        <Link to={"/" + USER} className="btn btn-outline-secondary ml-2">
                            Cancel
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ChangePassword;
