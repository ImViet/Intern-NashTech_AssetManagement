import React, { ComponentType, FunctionComponent, InputHTMLAttributes, useState } from 'react';
import { useField } from 'formik';
import { Search } from "react-bootstrap-icons";
import { Modal } from 'react-bootstrap';
import ILookupTable from 'src/interfaces/ILookupTable';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    lookupLabel: string;
    placeholder?: string;
    name: string;
    isrequired?: boolean;
    notvalidate?: boolean;
    TableComponent: FunctionComponent<ILookupTable>;
    request: Function;
    intialValueLabel: string;
};

const LookupField: React.FC<InputFieldProps> = (props) => {
    const [field, { error, touched }, helpers] = useField(props);
    const { setValue } = helpers;
    const { label, isrequired, notvalidate, TableComponent, request, intialValueLabel } = props;
    const [showLookup, setShowLookup] = useState(false);
    const [valueLabel, setValueLabel] = useState(intialValueLabel);

    const validateClass = () => {
        if (touched && error) return 'is-invalid';
        if (notvalidate) return '';
        if (touched) return 'is-valid';
        return '';
    };

    return (
        <>
            <div className="mb-3 row" onClick={()=>setShowLookup(true)}>
                <label className="col-4 col-form-label d-flex">
                    {label}
                    {isrequired && (
                        <div className="invalid ml-1">*</div>
                    )}
                </label>
                <div className="col">
                    <input {...field} {...props} hidden />
                    <div className={`form-control ${validateClass()} pointer`}>{valueLabel}</div>
                    <div className="" style={{ position: 'absolute', right: 30, top: 4, pointerEvents: "none" }}>
                        <Search />
                    </div>
                    {error && touched && (
                        <div className='invalid'>{error}</div>
                    )}
                </div>
            </div>

            <Modal
                className="lookup-modal"
                show={showLookup}
                onHide={() => setShowLookup(false)}
                aria-labelledby="login-modal"
            >
                <Modal.Body>
                    <TableComponent 
                        closeModal={()=>setShowLookup(false)}
                        onSelect={(label, value)=>{setValueLabel(label); setValue(value);}}
                        requestData={request}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};
export default LookupField;
