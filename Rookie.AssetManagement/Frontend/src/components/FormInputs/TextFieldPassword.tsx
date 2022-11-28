import React, { InputHTMLAttributes, useState } from 'react';
import { useField } from 'formik';
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    placeholder?: string;
    name: string;
    isrequired?: boolean;
    notvalidate?: boolean;
};

const TextFieldPassword: React.FC<InputFieldProps> = (props) => {
    const [field, { error, touched }] = useField(props);
    const { label, isrequired, notvalidate } = props;

    const validateClass = () => {
        if (touched && error) return 'is-invalid';
        if (notvalidate) return '';
        if (touched) return 'is-valid';

        return '';
    };

    const [showPass, setShowPass] = useState(true)
    const clickHandler = () => {
        setShowPass(!showPass);
    }

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
                    <div className="col d-flex position-relative p-0" >
                        <input type={(showPass == true) ? "password" : "text"} className={`form-control   ${validateClass()}`} {...field} {...props} />
                        <div className="position-absolute mt-1 icon-eye" style={{backgroundColor:"white"}} onClick={clickHandler}>
                            {(showPass === true) ? (
                                    <EyeFill className="text-black" style={{width:"20px"}} />
                                ) : (
                                    <EyeSlashFill className="text-black" style={{width:"20px"}} />
                                )}
                        </div>
                    </div>
                    {error && touched && (
                        <div className='invalid position-rela'>{error}</div>
                    )}
                </div>

            </div>

        </>
    );
};
export default TextFieldPassword;