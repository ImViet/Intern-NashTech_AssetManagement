import React, { useEffect, useState } from 'react'
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { FunnelFill } from "react-bootstrap-icons";

function SelectBox({
    options,
    placeholderButtonLabel,
    value,
    onChange,
    currentPage
}) {
  const [open, setOpen] = useState(false)
  useEffect(()=>{
    setOpen(false)
  }, [currentPage])
  return (
    <div className="filter-css d-flex align-items-center w-md mr-5" onClick={()=>{setOpen(val=>!val)}}>
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