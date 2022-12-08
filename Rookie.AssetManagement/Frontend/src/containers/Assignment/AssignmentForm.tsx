import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import DateField from 'src/components/FormInputs/DateField';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { ASSIGNMENT, ASSET_PARENT_ROOT, HOME, USER, USER_PARENT_ROOT, ASSIGNMENT_PARENT_ROOT } from 'src/constants/pages';
import { getCategory, getState } from '../Asset/reducer';
import TextAreaField from 'src/components/FormInputs/TextAreaField';
import LookupField from 'src/components/FormInputs/LookupField';
import IAssignmentForm from 'src/interfaces/Assignment/IAssignmentForm';
import { Modal } from 'react-bootstrap';
import UserLookupTable from './UserLookupTable';
import { Search } from 'react-feather';
import { getLookUpAssetRequest, getLookUpUserRequest } from './sagas/requests';
import AssetLookupTable from './AssetLookupTable';
import { createAssignment, updateAssignment } from './reducer';

const initialFormValues: IAssignmentForm = {
    user: '',
    userName:'',
    asset: '',
    assetName:'',
    note: '',
    assignedDate: new Date(),
    state: 7
};

const validationSchema = Yup.object().shape({
    user: Yup.string().required(""),
    asset: Yup.string().required(""),
    note: Yup.string().required(""),
    assignedDate: Yup.date().required("")
});

function AssignmentFormContainer({ initialAssignmentForm = {
    ...initialFormValues
} }) {
    const isUpdate = initialAssignmentForm.id ? true : false;

    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const handleResult = (result: boolean, message: string) => {
        if (result) {
            navigate(ASSIGNMENT_PARENT_ROOT);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialAssignmentForm}
                enableReinitialize
                validationSchema={validationSchema}

                onSubmit={(values) => {
                    setLoading(true);
                    setTimeout(() => {
                        if (isUpdate) {
                            dispatch(updateAssignment({ handleResult, formValues: {...values} }));
                        }
                        else {
                            dispatch(createAssignment({ handleResult, formValues: {...values} }));
                        }
                        setLoading(false);
                    }, 1000);
                }}
            >
                {(actions) => {
                    return (
                        <Form className='intro-y col-lg-6 col-12'>
                            <LookupField
                                name="user"
                                label="User"
                                isrequired
                                lookupLabel="Users"
                                request={getLookUpUserRequest}
                                TableComponent={UserLookupTable}
                                intialValueLabel={initialAssignmentForm.userName}
                            />

                            <LookupField
                                name="asset"
                                label="Asset"
                                isrequired
                                lookupLabel="Assets"
                                request={getLookUpAssetRequest}
                                TableComponent={AssetLookupTable}
                                intialValueLabel={initialAssignmentForm.assetName}
                            />

                            <DateField
                                name="assignedDate"
                                label="Assigned Date"
                                placeholder=""
                                isrequired
                                minDate={isUpdate ? initialAssignmentForm.assignedDate :new Date()}
                            />

                            <TextAreaField
                                name="note"
                                label="Note"
                                placeholder=""
                                isrequired
                            />

                            <div className="d-flex">
                                <div className="ml-auto">
                                    <button className="btn btn-danger mr-4"
                                        type="submit" disabled={!(actions.dirty && actions.isValid)}
                                    >
                                        Save {(loading) && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
                                    </button>

                                    <Link to={"/" + ASSIGNMENT} className="btn btn-outline-secondary ml-2">
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default AssignmentFormContainer;
