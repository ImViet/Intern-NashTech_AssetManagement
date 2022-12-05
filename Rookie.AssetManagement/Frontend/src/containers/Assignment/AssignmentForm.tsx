import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import DateField from 'src/components/FormInputs/DateField';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { ASSIGNMENT, ASSET_PARENT_ROOT, HOME, USER, USER_PARENT_ROOT } from 'src/constants/pages';
import { getCategory, getState } from '../Asset/reducer';
import TextAreaField from 'src/components/FormInputs/TextAreaField';
import LookupField from 'src/components/FormInputs/LookupField';
import IAssignmentForm from 'src/interfaces/Assignment/IAssignmentForm';
import { Modal } from 'react-bootstrap';
import UserLookupTable from './UserLookupTable';
import { Search } from 'react-feather';

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

    const [loading, setLoading] = useState(false);
    const [showLookup, setShowLookup] = useState(false);
    const [search, setSearch] = useState("");

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

    const showLookupModal = () => {
        setShowLookup(true)
    };

    const handleSearch = () => {
    };

    const handleChangeSearch = (e) => {
        e.preventDefault();

        const search = e.target.value;
        setSearch(search);
    };

    const fetchData = () => {
        //dispatch(getAssetList(query))
    };

    const mystyle = {
        marginLeft: "-10px",
        marginBottom: "5px",
        color: "#cf2338",
    };

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
                                onClick={() => showLookupModal()}
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

                                    <Link to={"/" + ASSIGNMENT} className="btn btn-outline-secondary ml-2">
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>

            <Modal
                className="modal-user"
                show={showLookup}
                onHide={() => setShowLookup(false)}
                aria-labelledby="login-modal"
            >
                <div className="first-login-modal">
                    <Modal.Body>
                        <div className="header-table">
                            <div>
                                <strong style={mystyle}>Select User</strong>
                                <div className="d-flex align-items-center w-ld ml-auto mr-2">
                                    <div style={{ marginTop: -33, marginLeft: -15 }} className="input-group">
                                        <input
                                            onChange={handleChangeSearch}
                                            value={search}
                                            type="text"
                                            className="input-search  form-control"
                                        />
                                        <span onClick={handleSearch} className=" search-icon p-1 pointer">
                                            <Search />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-detail">
                            <div className='row -intro-y'>
                                <div>
                                    <UserLookupTable
                                        assetHistory={null}
                                        result={null}
                                        fetchData={fetchData}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="d-flex mt-3 mr-2">
                            <div className="ml-auto">
                                <button className="btn btn-danger mr-4"
                                    type="submit" disabled={false}
                                >
                                    Save {(loading) && <img src="/oval.svg" className='w-4 h-4 ml-2 inline-block' />}
                                </button>

                                <button onClick={() => setShowLookup(false)} className="btn btn-outline-secondary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}

export default AssignmentFormContainer;
