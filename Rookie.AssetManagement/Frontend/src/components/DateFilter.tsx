import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import { CalendarDateFill } from "react-bootstrap-icons";

type Props = {
    label:string;
    date: Date;
    handleDateChange: Function;
}

const DateFilter: React.FC<Props> = ({ label, date, handleDateChange }) => {
    return (
        <div className="date-filter">
            <div className="col d-flex" style={{ width: "250px" }}>
                <div className="d-flex align-items-center w-100 position-relative">
                    <DatePicker
                        className={"form-control date-picker w-100 "}
                        selected={date}
                        onChange={(date) => handleDateChange(date)}
                        placeholderText="Assigned Date"
                        maxDate={new Date()} />
                    <div className="placeholder">{label}</div>
                </div>
                <div className="date-icon p-1 pointer">
                    <CalendarDateFill />
                </div>
            </div>
        </div>
    )
}

export default DateFilter;