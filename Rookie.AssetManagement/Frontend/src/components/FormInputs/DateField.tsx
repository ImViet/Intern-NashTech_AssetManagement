import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { CalendarDateFill } from "react-bootstrap-icons";
import DatePicker from 'react-datepicker';

type DateFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    placeholder?: string;
    name: string;
    isrequired?: boolean;
    notvalidate?: boolean;
    maxDate?: Date;
    minDate?: Date;
    filterDate?: (date: Date) => boolean;
};

const DateField: React.FC<DateFieldProps> = (props) => {
    const [{ value }, { error, touched }, { setValue }] = useField(props);
    const {
        label, isrequired, notvalidate, maxDate, minDate, filterDate,
    } = props;

    const validateClass = () => {
        if (touched && error) return 'is-invalid';
        if (notvalidate) return '';
        if (touched) return 'is-valid';

        return '';
    };

    const handleChangeAssignedDate = (assignDate: Date) => {
        setValue(assignDate);
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
                    <div className="d-flex align-items-center w-100">
                        <DatePicker
                            placeholderText=''
                            className={`border w-100 p-2 ${validateClass()}`}
                            dateFormat='MM/dd/yyyy'
                            selected={value}
                            onChange={date => handleChangeAssignedDate(date as Date)}
                            isClearable
                            showDisabledMonthNavigation
                            maxDate={maxDate}
                            minDate={minDate}
                            filterDate={filterDate}
                            wrapperClassName={`form-control`}
                        />

                        <div className="" style={{position: 'absolute', right: 40, top: 4}}>
                            <CalendarDateFill />
                        </div>

                    </div>
                    {error && touched && (
                        <div className='invalid'>{error}</div>
                        )}
                </div>
            </div>
        </>
    );
};
export default DateField;
