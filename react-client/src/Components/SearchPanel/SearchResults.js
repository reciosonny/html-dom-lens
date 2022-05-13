import React from "react";
import * as domUtils from "../../utils/domUtils";


const SearchResults = ({ results, closeSearchDialog }) => {
  const handleFindSearchedElement = async(e) =>{
    const selectedIndex = e.currentTarget.getAttribute("idx");
    const selectedType = e.currentTarget.children[0].innerText;
    const retrievedElement = domUtils.getElementByTagAndIndex(selectedType, parseInt(selectedIndex));
    retrievedElement.classList.add("focused-dom");
    retrievedElement.scrollIntoView({ block: "center" });
    closeSearchDialog();
  }

  return (
    <div className="results-container">
      {results.map((val) => (
        <div className="search-results" onClick={handleFindSearchedElement} idx={domUtils.getUniqueElementIdentifierByTagAndIndex(val.value).index}>
          <div className="results-tag">{val.value.tagName.toLowerCase()}</div>
          {domUtils.extractDomInfo(val.value).id + domUtils.extractDomInfo(val.value).classNamesString}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
