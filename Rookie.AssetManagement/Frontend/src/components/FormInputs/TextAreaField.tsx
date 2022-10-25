import React, { TextareaHTMLAttributes } from 'react';
import { useField } from 'formik';

type TextAreaFieldType = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    placeholder?: string;
    name: string;
    isrequired?: boolean;
    notvalidate?: boolean;
};

const TextAreaField: React.FC<TextAreaFieldType> = (props) => {
    const [field, { error, touched }, meta] = useField(props);
    const { label, isrequired, notvalidate } = props;

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
                        <div className="invalid ml-1">(*)</div>
                    )}
                </label>
                <div className="col">
                    <textarea
                        rows={3}
                        className={`form-control ${validateClass()}`}
                        {...field}
                        {...props}>
                    </textarea>
                    {error && touched && (
                        <div className='invalid'>{error}</div>
                    )}
                </div>
            </div>

        </>
    );
};
export default TextAreaField;
