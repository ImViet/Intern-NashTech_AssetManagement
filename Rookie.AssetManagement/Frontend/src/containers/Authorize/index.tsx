import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Form, Formik } from 'formik';

import Header from "../Layout/Header";
import TextField from "src/components/FormInputs/TextField";
import ILoginModel from "src/interfaces/ILoginModel";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { cleanUp, login } from "./reducer";

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

  return (
    <>
      <div className="row">
        <Header />
      </div>

      <div className='container'>
        <Modal
          show={isShow}
          dialogClassName="modal-90w"
          aria-labelledby="login-modal"
        >
          <Modal.Header closeButton>
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
            >
              {(actions) => (
                <Form className='intro-y'>
                  <TextField name="userName" label="Username" placeholder="john" isrequired />
                  <TextField name="password" label="Password" type="password" isrequired />

                  {error?.error && (
                    <div className="invalid">
                      {error.message}
                    </div>
                  )}

                  <div className="text-center mt-5">
                    <button className="btn btn-danger"
                      type="submit" disabled={loading}>
                      Login
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

export default Login;
