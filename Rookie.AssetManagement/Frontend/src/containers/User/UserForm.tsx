import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import differenceInYears from "date-fns/differenceInYears";
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
import { HOME, USER, USER_PARENT_ROOT } from 'src/constants/pages';
import Gender from 'src/constants/gender';
import { createUser, updateUser } from './reducer';


const initialFormValues: IUserForm = {
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    gender: Gender.Female,
    joinedDate: undefined,
    type: '',
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(""),
    lastName: Yup.string().required(""),
    type: Yup.string().required(""),
    dateOfBirth: Yup.date().required("")
        .test("dateOfBirth", "User is under 18. Please select a different date", function (value) {
            if (value) {
                return differenceInYears(new Date(), value) >= 18;
            }
            return true;

        }),
    joinedDate: Yup.date()
        .required("")
        .test("joinedDate", "User under the age of 18 may not join company. Please select a different date",
            (value, ctx) => {
                if (value) {
                    const condition = new Date(ctx.parent.dateOfBirth);
                    condition.setFullYear(condition.getFullYear() + 18);
                    if (value < condition)
                        return false;
                }
                return true;
            })
        .test("joinedDate", "Joined date is Saturday or Sunday. Please select a different date", (value) => {
            if (value) {
                if (value.getDay() === 6)
                    return false;
            }
            return true;
        })
        .test("joinedDate", "Joined date is Saturday or Sunday. Please select a different date", (value) => {
            if (value) {
                if (value.getDay() === 0)
                    return false;
            }
            return true;
        })
        .test("joinedDate", "Please Select Date of Birth",
            (value, ctx) => {
                if (value) {
                    if (ctx.parent.dateOfBirth === undefined) {
                        return false;
                    }

                }
                return true;
            })

});

type Props = {
    initialUserForm?: IUserForm;

};

const UserFormContainer: React.FC<Props> = ({ initialUserForm = {
    ...initialFormValues
} }) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const isUpdate = initialUserForm.id ? true : false;
    // if(!isUpdate){
    //     initialFormValues.joinedDate = new Date();
    // }

    const [dateOfBirth, setDateOfBirth] = useState();

    const navigate = useNavigate();
    const handleResult = (result: boolean, message: string) => {
        if (result) {
            NotificationManager.success(
                `${isUpdate ? 'Updated' : 'Created'} Successful User ${message}`,
                `${isUpdate ? 'Update' : 'Create'} Successful`,
                2000,
            );

            setTimeout(() => {
                navigate(USER_PARENT_ROOT);
            }, 1000);

        } else {
            NotificationManager.error(message, "Failed", 2000);
        }
    }
    const handleLanguage = (date) => {
        setDateOfBirth(date);
    }

    return (
        <Formik
            initialValues={initialUserForm}
            enableReinitialize
            validationSchema={validationSchema}

            onSubmit={(values) => {
                setLoading(true);
                setTimeout(() => {
                    if (isUpdate) {
                        dispatch(updateUser({ handleResult, formValues: values }));
                    }
                    else {
                        dispatch(createUser({ handleResult, formValues: values }));
                    }

                    setLoading(false);
                }, 1000);
            }}
        >
            {(actions) => {
                return (
                    <Form className='intro-y col-lg-6 col-12'>
                        <TextField
                            name="firstName"
                            label="First Name"
                            placeholder=""
                            disabled={isUpdate ? true : false} />

                        <TextField
                            name="lastName"
                            label="Last Name"
                            placeholder=""
                            disabled={isUpdate ? true : false} />

                        <DateField
                            label="Date of Birth"
                            name="dateOfBirth"
                            placeholder=""
                            onChangeCapture={handleLanguage}
                            disabled={isUpdate ? true : false} />

                        <CheckboxField
                            name="gender"
                            label="Gender"
                            isrequired
                            options={GenderOptions}
                            disabled={isUpdate ? true : false} />

                        <DateField
                            label="Joined Date"
                            id="joinedDate"
                            name="joinedDate"
                            placeholder=""
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

                                <Link to={"/" + USER} className="btn btn-outline-secondary ml-2">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default UserFormContainer;
