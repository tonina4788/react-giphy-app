import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../assets/img/search.svg';
import { ReactComponent as DeleteIcon } from '../assets/img/close.svg';

//Display Search Form
const SearchForm = ({searchTerm, searchForGifs, clearSearch}) => {
    const [searchInput, setSearchInput] = useState(searchTerm ? searchTerm : ''); //Set local state for search input, in order to send it to parent for start searching
    const textInput = React.useRef();
    
    //Catch Enter key push for start searching
    const handleKeyUp = useCallback((event) => {
        if (event.keyCode === 13 || event.key === 'Enter') {
            searchForGifs(searchInput)
        }
    }) 

    //Clear input vaue and clear data on parent
    const clearSearchData = useCallback(() => {
        clearSearch();
        setSearchInput('')
        textInput.current.value = ""
    }) 
    
    return (
        <div className="search__form">
            <div className="search__form__user-input">
                <input type="text"
                    ref={textInput}
                    className="search__form__user-input__input"
                    onChange={e => setSearchInput(e.target.value)} //Every time search term change, update State
                    onKeyUp={e => handleKeyUp(e)} //On every Key up call handleKeyUp in order to catch 'Enter'
                    placeholder="Search GIF..."
                    defaultValue={searchTerm} //Initiate input value with search term from parent
                />
                {/* CTA clear search. Displays only if there is search */}
                { searchInput || searchTerm ?
                    <DeleteIcon onClick={clearSearchData} className="search__form__user-input__input__clear-btn" /> : ''
                }
            </div>
            {/* CTA for start Searching, on click calls getSearchGifs */}
            <button onClick={() => searchForGifs(searchInput)} className="search__form__search-btn" >
                <SearchIcon className="search__form__search-btn__icon" />
            </button>   
        </div>
    );
}

SearchForm.propTypes = {
    searchTerm: PropTypes.string
};

export default SearchForm