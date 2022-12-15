import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import TextField from 'src/components/FormInputs/TextField';
import DateField from 'src/components/FormInputs/DateField';
import CheckboxField from 'src/components/FormInputs/CheckboxField';
import SelectField from 'src/components/FormInputs/SelectField';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { ASSET, ASSET_PARENT_ROOT, HOME, USER, USER_PARENT_ROOT } from 'src/constants/pages';
import IAssetForm from 'src/interfaces/Asset/IAssetForm';
import { createAsset, getCategory, getState, updateAsset } from './reducer';
import TextAreaField from 'src/components/FormInputs/TextAreaField';


const initialFormValues: IAssetForm = {
    assetName: '',
    category: "",
    specification: '',
    installedDate: undefined,
    state: 2,
    isEditable: true,
    isHaveAsssignment: false
};

const validationSchema = Yup.object().shape({
    assetName: Yup.string().required(""),
    category: Yup.string().required(""),
    specification: Yup.string().required(""),
    installedDate: Yup.date().required(""),
    state: Yup.number().required(""),
});

type Props = {
    initialAssetForm?: IAssetForm;
};

function AssetFormContainer({ initialAssetForm = {
    ...initialFormValues
} }) {
    const isUpdate = initialAssetForm.id ? true : false;

    const { FilterAssetCategoryOptions, FilterAssetStateOptions } = useAppSelector(state => state.assetReducer)

    const states = useMemo(() => {
        if (isUpdate) {
            return FilterAssetStateOptions.filter(state => state.label != "Assigned" && state.label != "All")
        }
        else {
            return FilterAssetStateOptions.filter(state => state.label == "Available" || state.label == "Not Available")
        }
    }, [FilterAssetStateOptions])

    const categories = useMemo(() => FilterAssetCategoryOptions.filter(cate => cate.label != "All"), [FilterAssetCategoryOptions])

    const [loading, setLoading] = useState(false);

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
    return (
        <Formik
            initialValues={initialAssetForm}
            enableReinitialize
            validationSchema={validationSchema}

            onSubmit={(values) => {
                setLoading(true);
                setTimeout(() => {
                    if (isUpdate) {
                        dispatch(updateAsset({ handleResult, formValues: { ...values } }));
                    }
                    else {
                        dispatch(createAsset({ handleResult, formValues: { ...values } }));
                    }
                    setLoading(false);
                }, 1000);
            }}
        >
            {(actions) => {
                return (
                    <Form className='intro-y col-lg-6 col-12'>
                        <TextField
                            name="assetName"
                            label="Name"
                            placeholder=""
                            isrequired
                        />

                        <SelectField
                            name="category"
                            label="Category"
                            options={categories}
                            isrequired
                            disabled={isUpdate ? true : false}
                        />

                        <TextAreaField
                            name="specification"
                            label="Specification"
                            placeholder=""
                            isrequired
                        />

                        <DateField
                            name="installedDate"
                            label="Installed Date"
                            placeholder=""
                            isrequired
                        />

                        <CheckboxField
                            name="state"
                            label="State"
                            isrequired
                            options={states}
                            checked={false}
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
    );
}

export default AssetFormContainer;
