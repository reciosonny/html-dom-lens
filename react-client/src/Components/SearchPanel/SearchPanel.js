import React, { useState, useEffect, useRef, useContext } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import * as domUtils from "../../utils/domUtils";

import SearchResults from './SearchResults';

const SearchPanel = ({onCancelSearch}) => {
  const [txtInput, setTxtInput] = useState("");
  const [generatedEl, setGeneratedEl] = useState([]);

  const clearSearch = () => {
    setTxtInput("");
  }

  const searchElements = (input) => {   
    if (input.trim() === "" || input.trim() === window.store.elementFilter) return;

    window.store.elementFilter = input.trim();
    
    const filteredElementsbyID = Object.entries([...document.querySelectorAll(`body [id^=${input} i]`)]).reduce((arr, [key, value]) => arr.concat([{ key, value }]), []);
    const filteredElementsbyClass = Object.entries([...document.querySelectorAll(`body [class^=${input} i]`)]).reduce((arr, [key, value]) => arr.concat([{ key, value }]), []);

    const filteredElements = domUtils.clearSearchArray([...filteredElementsbyID, ...filteredElementsbyClass]);
      
    setGeneratedEl(filteredElements);
  };

  return (
    <div>
      <div className="search-dimmer"></div>
      <div className="search-panel__dialogbox">
        <div className = "header-style">
          <div className = "header-style__container-form">
            <button className="search-button" onClick={searchElements(txtInput)}>
              <AiOutlineSearch size={14} color="#673ab7"/>
            </button>  
            <form className='search-form'>
              <input
                value={txtInput}          
                onChange={(e) => setTxtInput(e.target.value)}
                type='text'
                className='search-form__text-field'
                placeholder='Filter DOM Element Here...'
                autoFocus
              />
            </form>   
            <button className="clear-button" onClick={clearSearch}> X </button>  
          </div>
          <button className ="cancel-button" onClick={onCancelSearch} > Cancel</button>
        </div>
        <div className="body-style">
          <div className="body-style__container-form"> 
            {generatedEl.length > 0 && txtInput.trim() !== "" ? (
                <SearchResults
                  results={generatedEl}
                  closeSearchDialog={onCancelSearch}
                />
              ) : (
                <p> No Results for query</p>
              )}
          </div> 
        </div>
      </div>
    </div>
  )
}

export default SearchPanel