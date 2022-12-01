import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Form, Formik } from 'formik';

import Header from "src/containers/Layout/Header";
import TextField from "src/components/FormInputs/TextField";
import ILoginModel from "src/interfaces/ILoginModel";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { changePassword, cleanUp, login } from "src/containers/Authorize/reducer";

import * as Yup from 'yup';
import IChangePassword from "src/interfaces/IChangePassword";
import TextFieldPassword from "src/components/FormInputs/TextFieldPassword";

const ChangePasswordSchema = Yup.object().shape({
  passwordOld: Yup.string().required(""),
  passwordNew: Yup.string().required(""),
});

const initialValues: IChangePassword = {
  passwordOld: '',
  passwordNew: '',
}

const ChangePassword = ({show, onClose}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.authReducer);
  const [ showSuccess, setShowSuccess ] = useState(false);

  const handleSubmit = (values, actions) => {
    dispatch(changePassword({ handleResult: (result, data) => {
      if (result) {
        onClose()
        setShowSuccess(true)
      }else{
        actions.setErrors(data)
      }
      actions.setSubmitting(false)
    }, formValues: values }));
  }

  return (
    <>
      <div className='container'>
        <Modal
          show={show}
          onHide={onClose}
          aria-labelledby="login-modal"
        >
          <div className="first-login-modal">
            <Modal.Header style={{paddingLeft:47, paddingRight:47 }}>
              <Modal.Title id="login-modal">
                Change password
            </Modal.Title>

            </Modal.Header>
              <Modal.Body style={{paddingLeft:47, paddingRight:47 }}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={ChangePasswordSchema}                 
                >
                  {(actions) => (
                    <Form className='intro-y'>
                      <TextFieldPassword name="passwordOld" label="Old password" isrequired={true} />
                      {error && (
                        <div className="invalid">
                          {error.message}
                        </div>
                      )} 

                      <TextFieldPassword name="passwordNew" label="New password" isrequired={true} />
                      
                      <div className="text-right mt-5">
                        <button className="btn btn-danger"
                          type="submit" disabled={!(actions.dirty && actions.isValid)}>
                          Save
                          {(loading) && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
                        </button>
                        <button onClick={onClose} className="btn btn-outline-secondary ml-2">
                            Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
          </div>
        </Modal>
        
        <Modal
          show={showSuccess}
          onHide={() => setShowSuccess(false)}
          aria-labelledby="login-modal"
        >
          <div className="first-login-modal">
            <Modal.Header style={{paddingLeft:48, paddingRight:48 }}>
              <Modal.Title id="login-modal">
                Change password
            </Modal.Title>

            </Modal.Header>
              <Modal.Body style={{paddingLeft:48, paddingRight:48 }}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                  }}
                  >
                  {(actions) => (
                    <Form className='intro-y'>
                      <p>Your password has been changed successfully!</p>

                      <div className="text-right mt-5">
                        <button onClick={() => setShowSuccess(false)} className="btn btn-outline-secondary ml-2">
                            Close
                        </button>
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
