import React from 'react'
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { FunnelFill } from "react-bootstrap-icons";

function SelectBox({
    options,
    placeholderButtonLabel,
    value,
    onChange,
}) {
  return (
    <div className="filter-css d-flex align-items-center w-md mr-5">
        <ReactMultiSelectCheckboxes
            options={options}
            hideSearch={true}
            placeholderButtonLabel={placeholderButtonLabel}
            value={value}
            onChange={onChange}
            />
        <div className="icon-filter border p-2">
            <FunnelFill />
        </div>
    </div>  
  )
}

export default SelectBox