import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Search } from "react-feather";
import useThrottle from "src/hooks/useThrottle";

type Props = {
    handleSearch: Function;
    getSuggestionRequest: Function;
}

const SearchBox : React.FC<Props> = ({ handleSearch , getSuggestionRequest}) =>{
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleChangeSearch = (e) => {
        e.preventDefault();
        const search = e.target.value;
        setSearch(search);
        getSuggestion(search);
    };

    const handleSuggestionCLick =(keyword)=>{
        return ()=>{
            handleSearch(keyword); 
            setSearch(keyword); 
            setShow(false);
        }
    }

    const getSuggestion = useThrottle((keyword)=>{
        if(keyword == "") {
            setSuggestions([])
            return
        }
        getSuggestionRequest(keyword)
            .then((res)=>{
                if(res.data.length > 0){
                    setShow(true)
                }
                setSuggestions(res.data)
            })
            .catch(err=>console.log(err))
    }, 250)

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
                    {suggestions?.length>0 ? (
                        <div className="suggestion-list" style={{visibility: show? "visible" : "hidden"}}>
                            {suggestions.map((suggestion,index)=>(
                                <div key={index} 
                                    className="suggestion" 
                                    onMouseDown={(e) => e.preventDefault()} 
                                    onClick={handleSuggestionCLick(suggestion)}>
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    ):null}
                </div>
            </div>
    );
}

export default SearchBox;
