import React, { useState } from "react";
import * as domUtils from "../../utils/domUtils";
import ColorDetails from "../ColorDetails";
import ChildrenDetails from "../DomInfoDialogBox/ChildrenDetails";

const ChildDialogBox = ({domChild, childAttributes}) => {
  const [seeMoreAttr, setSeeMoreAttr] = useState(true);
  const numAttibToDisplay = !seeMoreAttr ? childAttributes.length : 2;
  const attrleftover = childAttributes.length - 2;

  const handleSeeMoreAttr = () => {
    setSeeMoreAttr(!seeMoreAttr);
  };

  return (
    <div
      className="extended-dialog-box"    
    >
      <span className="dom-header-tag">
        {domUtils.extractDomInfo(domChild).tag}
      </span>
      <span className="dom-header-details">
        {domUtils.extractDomInfo(domChild).id}
        {domUtils.extractDomInfo(domChild).classNames.map((val) => (
          <span>{val}</span>
        ))}
      </span>
      <div className="flex-row">
        <div className="flex-column">
          <div className="dom-styles-details">
            {" "}
            {domUtils.extractDomInfo(domChild).size}
          </div>
          <div className="dom-styles">Size</div>
        </div>
        <div className="flex-column">
          <div className="dom-styles-details">
            <ColorDetails
              color={domUtils.extractDomInfo(domChild).textcolor}
            />
          </div>
          <div className="dom-styles">Text-Color</div>
        </div>
        <div className="flex-column">
          <div className="dom-styles-details">
            <ColorDetails
              color={domUtils.extractDomInfo(domChild).backgroundColor}
            />
          </div>
          <div className="dom-styles">Background-Color</div>
        </div>
      </div>
      <div className="dom-styles-details">
        {domUtils.extractDomInfo(domChild).family}
      </div>
      <div className="dom-styles">Font Family</div>
    
      <div className="dom-dialog">data-* attributes </div>
      <div className="dom-dialog-child-details">
        {childAttributes.slice(0, numAttibToDisplay).map((val) => (
          <div className="attributecontainer">
            <div className="attributeitems">{val.key}</div>
            <div className="attributeitems">{val.value}</div>
          </div>
        ))}
      </div>
      {childAttributes.length > 2 && (
        <div id="closeDom" className="see-more" onClick={handleSeeMoreAttr}>
          {seeMoreAttr ? `... ${attrleftover} more` : `... see less`}
        </div>
      )}
      <ChildrenDetails children={domUtils.extractDomInfo(domChild).children} />
    </div>
  );
};

export default ChildDialogBox;
