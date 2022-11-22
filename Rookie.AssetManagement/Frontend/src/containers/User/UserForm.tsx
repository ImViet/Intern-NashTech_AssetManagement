import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

import TextField from 'src/components/FormInputs/TextField';
import DateField from 'src/components/FormInputs/DateField';
import CheckboxField from 'src/components/FormInputs/CheckboxField';
import SelectField from 'src/components/FormInputs/SelectField';
// import { BRAND_PARENT_ROOT } from 'src/constants/pages';
// import { USER_PARENT_ROOT } from 'src/constants/pages';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
// import { createBrand, updateBrand } from './reducer';
import IUserForm from 'src/interfaces/User/IUserForm';
import { Status } from 'src/constants/status';
import { GenderOptions, UserTypeOptions } from 'src/constants/selectOptions';
import { HOME, USER } from 'src/constants/pages';
import Gender from 'src/constants/gender';


const initialFormValues: IUserForm = {
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    gender: "Female",
    joinedDate: undefined,
    type: '',
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    // gender: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    dateOfBirth: Yup.date().required("Required"),
    joinedDate: Yup.date().required("Required"),
});

type Props = {
    initialUserForm?: IUserForm;
};

const UserFormContainer: React.FC<Props> = ({ initialUserForm = {
    ...initialFormValues
} }) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const isUpdate = initialUserForm.userId ? true : false;

    const navigate = useNavigate();

    const handleResult = (result: boolean, message: string) => {
        if (result) {
            NotificationManager.success(
                `${isUpdate ? 'Updated' : 'Created'} Successful User ${message}`,
                `${isUpdate ? 'Update' : 'Create'} Successful`,
                2000,
            );

            setTimeout(() => {
                // navigate(USER_PARENT_ROOT);
            }, 1000);

        } else {
            NotificationManager.error(message, 'Create failed', 2000);
        }
    }

    return (
        <Formik
            initialValues={initialUserForm}
            enableReinitialize
            validationSchema={validationSchema}
            
            onSubmit={(values) => {
                console.log(values)
                setLoading(true);

                setTimeout(() => {
                    if (isUpdate) {
                        // dispatch(updateBrand({ handleResult, formValues: values }));
                    }
                    else {
                        // dispatch(createBrand({ handleResult, formValues: values }));
                    }

                    setLoading(false);
                }, 1000);
            }}
        >
            {(actions) => (
                <Form className='intro-y col-lg-6 col-12'>
                    <TextField 
                        name="firstName" 
                        label="First Name" 
                        placeholder="" 
                        isrequired 
                        disabled={isUpdate ? true : false} />

                    <TextField 
                        name="lastName" 
                        label="Last Name" 
                        placeholder="" 
                        isrequired 
                        disabled={isUpdate ? true : false} />

                    <DateField
                        label="Date of Birth"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        placeholder="" 
                        isrequired
                        disabled={isUpdate ? true : false} />

                    <CheckboxField 
                        name="gender" 
                        label="Gender"
                        isrequired
                        options={GenderOptions}
                        disabled={isUpdate ? true : false}/>

                    <DateField
                        label="Joined Date"
                        id="joinedDate"
                        name="joinedDate"
                        placeholder="" 
                        isrequired
                        disabled={isUpdate ? true : false} />

                    <SelectField 
                        name="type" 
                        label="Type" 
                        options={UserTypeOptions}
                        isrequired
                        disabled={isUpdate ? true : false} />

                    <div className="d-flex">
                        <div className="ml-auto">
                            <button className="btn btn-danger"
                                type="submit" disabled={!(actions.dirty && actions.isValid)}
                            >
                                Save {(loading) && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
                            </button>

                            <Link to={USER} className="btn btn-outline-secondary ml-2">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default UserFormContainer;
