import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Search } from "react-feather";

function SearchBox({ handleSearch }) {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");

    const handleChangeSearch = (e) => {
        e.preventDefault();

        const search = e.target.value;
        setSearch(search);
    };

    const handleSuggestionCLick =(keyword)=>{
        return ()=>{
            handleSearch(keyword); 
            setSearch(keyword); 
            setShow(false);
        }
    }

    return (
            <div className="search-box d-flex align-items-center w-ld ml-auto mr-2">
                <div className="input-group">
                    <input
                        onFocus={()=>setShow(true)}
                        onBlur={()=>setShow(false)}
                        onChange={handleChangeSearch}
                        value={search}
                        type="text"
                        className="input-search form-control"
                    />
                    <span onClick={() => handleSearch(search)} className="search-icon p-1 pointer">
                        <Search />
                    </span>
                    <div className="suggestion-list" style={{visibility: show? "visible" : "hidden"}}>
                        <div className="suggestion" onMouseDown={(e) => e.preventDefault()} onClick={handleSuggestionCLick("Dat")}>Dat</div>
                    </div>
                </div>
            </div>
    );
}

export default SearchBox;
