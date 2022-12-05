import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import DateField from 'src/components/FormInputs/DateField';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { ASSET, ASSET_PARENT_ROOT, HOME, USER, USER_PARENT_ROOT } from 'src/constants/pages';
import { createAsset, getCategory, getState, updateAsset } from '../Asset/reducer';
import TextAreaField from 'src/components/FormInputs/TextAreaField';
import LookupField from 'src/components/FormInputs/LookupField';
import IAssignmentForm from 'src/interfaces/Assignment/IAssignmentForm';
import { Modal } from 'react-bootstrap';


const initialFormValues: IAssignmentForm = {
    user: '',
    asset: "",
    note: '',
    assignedDate: new Date(),
};

const validationSchema = Yup.object().shape({
    user: Yup.string().required(""),
    asset: Yup.string().required(""),
    note: Yup.string().required(""),
    assignedDate: Yup.date().required("")
});

type Props = {
    initialAssetForm?: IAssignmentForm;
};

function AssignmentFormContainer({ initialAssetForm = {
    ...initialFormValues
} }) {
    const isUpdate = initialAssetForm.id ? true : false;

    const { FilterAssetCategoryOptions, FilterAssetStateOptions } = useAppSelector(state => state.assetReducer)
    
    const states = useMemo(() => {
        if (isUpdate) {
            return FilterAssetStateOptions.filter(state => state.label != "Assigned" && state.label != "ALL" )
        }
        else {
            return FilterAssetStateOptions.filter(state => state.label == "Available" || state.label == "Not Available")
        }
    }, [FilterAssetStateOptions])

    const categories = useMemo(() => FilterAssetCategoryOptions.filter(cate => cate.label != "ALL"), [FilterAssetCategoryOptions])

    const [loading, setLoading] = useState(false);
    const [ showLookup, setShowLookup ] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const handleResult = (result: boolean, message: string) => {
        if (result) {
            navigate(ASSET_PARENT_ROOT);
        }
    };
    
    useEffect(() => {
        dispatch(getCategory())
        dispatch(getState())
    }, [])

    const showLookupModal = () =>{
        setShowLookup(true)
    }
    return (
        <>
            <Formik
            initialValues={initialAssetForm}
            enableReinitialize
            validationSchema={validationSchema}

            onSubmit={(values) => {
                setLoading(true);
                setTimeout(() => {
                    if (isUpdate) {
                        // dispatch(updateAsset({ handleResult, formValues: {...values} }));
                    }
                    else {
                        // dispatch(createAsset({ handleResult, formValues: {...values} }));
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
                            placeholder=""
                            isrequired
                            onClick={() => showLookupModal()}
                        />

                        <LookupField
                            name="asset"
                            label="Asset"
                            placeholder=""
                            isrequired
                        />

                        <DateField
                            name="assignedDate"
                            label="Assigned Date"
                            placeholder=""
                            isrequired
                            minDate={new Date()}
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

                                <Link to={"/" + ASSET} className="btn btn-outline-secondary ml-2">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </Form>
                );
            }}
            </Formik>

            <Modal
            show={showLookup}
            onHide={() => setShowLookup(false)}
            aria-labelledby="login-modal"
            >
                <div className="first-login-modal">
                    <Modal.Body style={{paddingLeft:48, paddingRight:48 }}>
                    <Formik
                        initialValues={initialAssetForm}
                        onSubmit={(values) => {
                        }}
                        >
                        {(actions) => (
                        <Form className='intro-y'>
                            <p>Your password has been changed successfully!</p>

                            <div className="text-right mt-5">
                            <button onClick={() => setShowLookup(false)} className="btn btn-outline-secondary ml-2">
                                Close
                            </button>
                            </div>
                        </Form>
                        )}
                    </Formik>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}

export default AssignmentFormContainer;
