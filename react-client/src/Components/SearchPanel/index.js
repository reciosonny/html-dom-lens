import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import * as domUtils from "../../utils/domUtils";
import DomMinimalDetailsWidget from "../DomMinimalDetailsWidget";
import SearchPanelDialogBox from "./SearchPanelDialogBox";

const SearchPanel = () => {
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [domMinimalDetailsStyles, setDomMinimalDetailsStyles] = useState({ width: 0, positionY: 0, positionX: 0 });
  const [domLeanDetails, setDomLeanDetails] = useState({ elId: "", elClassNames: [], domType: "", show: false });

  const refDomHighlight = React.useRef(null);

  const switchSearch = () => {
    setShowSearchDialog(true);
  };

  const onCancelSearch = () => {
    setShowSearchDialog(false);
  };

  const manualHideLeanDetails = () => {
    setDomLeanDetails({show: false});
  }

  const onSelectedElement = ( elSelected ) => {
    const elBoundingRect = elSelected.getBoundingClientRect();
    const leanDetails = domUtils.extractDomInfo(elSelected);
    
    document.querySelectorAll(".focused-dom").forEach((elTarget,idx) => {
      elTarget.classList.remove("focused-dom");
    });

    setDomLeanDetails({    
      elId: elSelected.id,      
      elClassNames: [...elSelected.classList],
      domType: leanDetails.tag,
      show: true
    });
    
    setDomMinimalDetailsStyles({ 
      width: `${Math.round(elBoundingRect.width-30)}px`,
      positionY: Math.round(window.scrollY+(elBoundingRect.top-30)), 
      positionX: Math.round(window.scrollX+elBoundingRect.left)       
    });
    
    elSelected.classList.add("focused-dom");
    elSelected.scrollIntoView({ block: "center" });

    onCancelSearch();
  }


  return (      
    <div className="search-panel">
      {showSearchDialog &&
       <SearchPanelDialogBox
        onCancelSearch={onCancelSearch}
        onSelectedElement={onSelectedElement}
       />}
      <button className="search-panel__button-switch" onClick={switchSearch}>
        <AiOutlineSearch size={20} color="#263238" />
      </button> 
      <div onClick={manualHideLeanDetails}>
        {domLeanDetails.show && (
          <DomMinimalDetailsWidget
            elId={domLeanDetails.elId}
            elClassNames={domLeanDetails.elClassNames}
            domType={domLeanDetails.domType}
            width={domMinimalDetailsStyles.width}
            positionX={domMinimalDetailsStyles.positionX}
            positionY={domMinimalDetailsStyles.positionY}
          />
        )}  
      </div>  
    </div>
  );
};
 
export default SearchPanel;
