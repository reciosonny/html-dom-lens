import React, { useState, useEffect, useRef, useContext } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import * as domUtils from "../../utils/domUtils";
import SearchResults from './SearchResults';

const SearchPanelDialogBox = ({ onCancelSearch, onSelectedElement }) => {
  const [txtInput, setTxtInput] = useState("");
  const [generatedEl, setGeneratedEl] = useState([]);

  const clearSearch = () => {
    setTxtInput("");
  }

  const searchElements = (input) => {       
    if (input.trim() === "" || input.trim() === window.store.elementFilter) return;  
         
    if (input.codePointAt(0) <= 95 || input.codePointAt(0) >= 122)  return; //to prevent bug if first character is not from a-z
    
    window.store.elementFilter = input.trim();

    const generalFilter = Object.entries([...document.querySelectorAll(`body ${input} `)]).reduce((arr, [key, value]) => arr.concat([{ key, value }]), []);

    const filteredElementsbyID = Object.entries([...document.querySelectorAll(`body [id^=${input} i]`)]).reduce((arr, [key, value]) => arr.concat([{ key, value }]), []);
    
    const filteredElementsbyClass = Object.entries([...document.querySelectorAll(`body [class^=${input} i]`)]).reduce((arr, [key, value]) => arr.concat([{ key, value }]), []);

    const filteredElements = [...generalFilter, ...filteredElementsbyID, ...filteredElementsbyClass];

    const arrValues = filteredElements.map(obj => obj.value); //use in assisting the filtering of duplicates in filteredElements
    const filteredValues = domUtils.arrRemoveDomInfo(filteredElements.filter(({value}, index) => !arrValues.includes(value, index + 1))); 
  
    setGeneratedEl(filteredValues);

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
                  onSelectedElement={onSelectedElement} 
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

export default SearchPanelDialogBox