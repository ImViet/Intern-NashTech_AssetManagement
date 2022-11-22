import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import ISelectOption from 'src/interfaces/ISelectOption';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    isrequired?: boolean;
    options: ISelectOption[];
    notvalidate?: boolean;
};

const SelectField: React.FC<InputFieldProps> = (props) => {
    const [field, { error, touched, value }, { setValue }] = useField(props);

    const { name, options, label, isrequired, notvalidate } = props;

    const handleChange = (e) => {
        setValue(e.target.value)
    };

    const validateClass = () => {
        if (touched && error) return 'is-invalid';
        if (notvalidate) return '';
        if (touched) return 'is-valid';

        return '';
    };

    return (
        <>
            <div className="mb-3 row">
                <label className="col-4 col-form-label d-flex">
                    {label}
                    {isrequired && (
                        <div className="invalid ml-1"></div>
                    )}
                </label>

                <div className="col">
                    <select className={`custom-select ${validateClass()}`} onChange={handleChange}>
                        <option selected hidden></option>
                        {
                            options.map(({ id, label: optionLabel, value: optionValue }) => (
                                <option key={id} value={optionValue} selected = {optionValue === value}>
                                    {optionLabel}
                                </option>
                            ))
                        }
                    </select>
                    {error && touched && (
                        <div className='invalid'>{error}</div>
                    )}
                </div>
            </div>
        </>
    );
};
export default SelectField;
