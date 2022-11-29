import React, { useEffect, useMemo, useState } from 'react';
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
import { Status } from 'src/constants/status';
import { CategoryTypeOptions, GenderOptions, StateOptions, UserTypeOptions } from 'src/constants/selectOptions';
import { ASSET, HOME, USER, USER_PARENT_ROOT } from 'src/constants/pages';
import Gender from 'src/constants/gender';
import IAssetForm from 'src/interfaces/Asset/IAssetForm';
import { createAsset, getCategory, getState, updateAsset } from './reducer';


const initialFormValues: IAssetForm = {
    Name: '',
    Category: '',
    Specification: '',
    InstalledData: undefined,
    State: '',
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
    initialUserForm?: IAssetForm;

};

function AssetFormContainer({ initialUserForm = {
    ...initialFormValues
} }) {

    const {FilterAssetCategoryOptions ,FilterAssetStateOptions} = useAppSelector(state=> state.assetReducer)
    const states = useMemo(()=>FilterAssetStateOptions.filter(state => state.label=="Available" ||  state.label=="Not Available"), [FilterAssetStateOptions])
    const categories = useMemo(()=>FilterAssetCategoryOptions.filter(cate => cate.label!="ALL"), [FilterAssetCategoryOptions])
    
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
            navigate(USER_PARENT_ROOT);
        }
    };
    const handleLanguage = (date) => {
        setDateOfBirth(date);
    };
    useEffect(()=>{
        dispatch(getCategory())
        dispatch(getState())
    },[])
    return (
        <Formik
            initialValues={initialUserForm}
            enableReinitialize
            validationSchema={validationSchema}

            onSubmit={(values) => {
                setLoading(true);
                setTimeout(() => {
                    if (isUpdate) {
                        dispatch(updateAsset({ handleResult, formValues: values }));
                    }
                    else {
                        dispatch(createAsset({ handleResult, formValues: values }));
                    }
                    setLoading(false);
                }, 1000);
            } }
        >
            {(actions) => {
                return (
                    <Form className='intro-y col-lg-6 col-12'>
                        <TextField
                            name="Name"
                            label="Name"
                            placeholder=""
                            isrequired
                            disabled={isUpdate ? true : false} />

                        <SelectField
                            name="Category"
                            label="Category"
                            options={categories}
                            isrequired
                            disabled={isUpdate ? true : false} />
                        
                        <TextField
                            name="Specification"
                            label="Specification"
                            placeholder=""
                            isrequired
                            disabled={isUpdate ? true : false} />

                        <DateField
                            label="Installed Data"
                            name="InstalledData"
                            placeholder=""
                            isrequired
                            onChangeCapture={handleLanguage}
                            disabled={isUpdate ? true : false} />

                        <CheckboxField
                            name="State"
                            label="State"
                            isrequired
                            options={states}
                            disabled={isUpdate ? true : false} />

                        <div className="d-flex">
                            <div className="ml-auto">
                                <button className="btn btn-danger"
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
            } }
        </Formik>
    );
}

export default AssetFormContainer;
