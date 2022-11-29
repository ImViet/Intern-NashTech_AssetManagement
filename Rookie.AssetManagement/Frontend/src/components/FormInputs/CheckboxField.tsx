import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

import ISelectOption from 'src/interfaces/ISelectOption';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    isrequired?: boolean;
    options: ISelectOption[];
    checked? : boolean;
};

const CheckboxField: React.FC<InputFieldProps> = (props) => {
    const [field, { error, touched, value }, { setValue }] = useField(props);

    const { name, options, label, isrequired, checked } = props;

    const handleChange = (e) => {
        setValue(e.target.value)
    };

    const display = () => {
        if (checked) return 'form-check-inline';

        return '';
    };

    return (
        <>
            <div className="mb-3 row">
                <label className="col-4 col-form-label d-flex">
                    {label}
                    {isrequired && (
                        <div className="invalid ml-1">*</div>
                    )}
                </label>
                <div className="col">
                    {
                        options.map(({ id, label: optionLabel, value: optionValue }) => (
                            <div className={`form-check ${display()}`} key={id}>
                                <input className="form-check-input input-radio"
                                    id={id.toString()}
                                    type="radio"
                                    name={name}
                                    value={optionValue}
                                    onChange={handleChange}
                                    checked={optionValue == value}
                                />
                                <label className="form-check-label" htmlFor={id.toString()}>
                                    {optionLabel}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>

        </>
    );
};
export default CheckboxField;
