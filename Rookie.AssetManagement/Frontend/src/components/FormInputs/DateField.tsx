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
    const [{ value, }, { error, touched }, { setValue, setTouched, setError },] = useField(props);
    const {
        name, label, isrequired, notvalidate, maxDate, minDate, filterDate,
    } = props;

    const validateClass = () => {
        if (touched && error) return 'is-invalid';
        if (notvalidate) return '';
        if (touched) return 'is-valid';
        return '';
    };

    const handleTouched = () => {
        setTouched(true);
    }
    const handleChangeAssignedDate = (assignDate: Date) => {
        if (!assignDate) {
            setError("required")
            setValue(undefined);
        }
        else {
            setValue(assignDate)
        }
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
                    <div className="d-flex align-items-center w-100">
                        <DatePicker
                            placeholderText=''
                            className={`form-control  w-100 p-2 ${validateClass()}`}
                            dateFormat='dd/MM/yyyy'
                            selected={value}
                            onChange={date => handleChangeAssignedDate(date as Date)}
                            showDisabledMonthNavigation
                            maxDate={maxDate}
                            minDate={minDate}
                            onInputClick={handleTouched}
                            filterDate={filterDate}
                            wrapperClassName={`w-100`}
                        />

                        <div className="" style={{ position: 'absolute', right: 30, top: 4 }}>
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
