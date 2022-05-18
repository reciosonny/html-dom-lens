import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import * as domUtils from "../../utils/domUtils";
import DomMinimalDetailsWidget from "../DomMinimalDetailsWidget";
import SearchPanelDialogBox from "./SearchPanelDialogBox";

const SearchPanel = () => {
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [domMinimalDetailsStyles, setDomMinimalDetailsStyles] = useState({ width: 0, positionY: 100, positionX: 0 });
  const [domLeanDetails, setDomLeanDetails] = useState({ elId: "", elClassNames: [], domType: "" });

  const refDomHighlight = React.useRef(null);

  const switchSearch = () => {
    setShowSearchDialog(true);
  };

  const onCancelSearch = () => {
    setShowSearchDialog(false);
  };

  const onSelectedElement = ( elSelected ) => {
    const elParameters = domUtils.getElementParameters(elSelected);
    const leanDetails = domUtils.extractDomInfo(elSelected);

    setDomLeanDetails({    
      elId: leanDetails.id.substring(1),      
      elClassNames: [...elSelected.classList],
      domType: leanDetails.tag
    });

    setDomMinimalDetailsStyles({ 
      width: `${elParameters.width}px`,
      positionY: elParameters.positionY,
      positionX: elParameters.positionX
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
        <AiOutlineSearch size={14} color="#263238" />
      </button>
      <DomMinimalDetailsWidget
        ref={refDomHighlight}
        elId={domLeanDetails.elId}
        elClassNames={domLeanDetails.elClassNames}
        domType={domLeanDetails.domType}
        width={domMinimalDetailsStyles.width}
        positionX={domMinimalDetailsStyles.positionX}
        positionY={domMinimalDetailsStyles.positionY}
        show={true}
      />
    </div>
  );
};
 
export default SearchPanel;
