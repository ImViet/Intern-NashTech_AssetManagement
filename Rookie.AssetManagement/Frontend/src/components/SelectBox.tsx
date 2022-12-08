import React, { useState } from 'react'
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { FunnelFill } from "react-bootstrap-icons";

function SelectBox({
    options,
    placeholderButtonLabel,
    value,
    onChange,
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="filter-css d-flex align-items-center w-md mr-5" onBlur={()=>setOpen(false)} onClick={()=>setOpen(true)}>
        <ReactMultiSelectCheckboxes
            menuIsOpen={open}
            options={options}
            hideSearch={true}
            placeholderButtonLabel={placeholderButtonLabel}
            value={value}
            onChange={onChange}
            />
        <div className="icon-filter border p-2">
            <FunnelFill />
        </div>
        <div className="placeholder">{placeholderButtonLabel}</div>
    </div>  
  )
}

export default SelectBox