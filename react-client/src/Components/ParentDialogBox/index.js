import React, { useState } from "react";
import * as domUtils from "../../utils/domUtils";
import ColorDetails from "../ColorDetails";
import ParentDetails from "../DomInfoDialogBox/ParentDetails";
import ChildrenDetails from "../DomInfoDialogBox/ChildrenDetails";

const ParentDialogBox = ({domParent, parentAttributes}) => {
  const [seeMoreAttr, setSeeMoreAttr] = useState(true);
  const numAttibToDisplay = !seeMoreAttr ? parentAttributes.length : 2;
  const attrleftover = parentAttributes.length - 2;

  const handleSeeMoreAttr = () => {
    setSeeMoreAttr(!seeMoreAttr);
  };

  return (
    <div
      className="extended-dialog-box"    
    >
      <span className="dom-header-tag">
        {domUtils.extractDomInfo(domParent).tag}
      </span>
      <span className="dom-header-details">
        {domUtils.extractDomInfo(domParent).id}
        {domUtils.extractDomInfo(domParent).classNames.map((val) => (
          <span>{val}</span>
        ))}
      </span>
      <div className="flex-row">
        <div className="flex-column">
          <div className="dom-styles-details">
            {" "}
            {domUtils.extractDomInfo(domParent).size}
          </div>
          <div className="dom-styles">Size</div>
        </div>
        <div className="flex-column">
          <div className="dom-styles-details">
            <ColorDetails
              color={domUtils.extractDomInfo(domParent).textcolor}
            />
          </div>
          <div className="dom-styles">Text-Color</div>
        </div>
        <div className="flex-column">
          <div className="dom-styles-details">
            <ColorDetails
              color={domUtils.extractDomInfo(domParent).backgroundColor}
            />
          </div>
          <div className="dom-styles">Background-Color</div>
        </div>
      </div>
      <div className="dom-styles-details">
        {domUtils.extractDomInfo(domParent).family}
      </div>
      <div className="dom-styles">Font Family</div>
      <ParentDetails
        tag={domUtils.extractDomInfo(domParent.parentElement).tag}
        id={domUtils.extractDomInfo(domParent.parentElement).id}
        classes={domUtils.extractDomInfo(domParent.parentElement).classNames}
      />
      <div className="dom-dialog">data-* attributes </div>
      <div className="dom-dialog-child-details">
        {parentAttributes.slice(0, numAttibToDisplay).map((val) => (
          <div className="attributecontainer">
            <div className="attributeitems">{val.key}</div>
            <div className="attributeitems">{val.value}</div>
          </div>
        ))}
      </div>
      {parentAttributes.length > 2 && (
        <div id="closeDom" className="see-more" onClick={handleSeeMoreAttr}>
          {seeMoreAttr ? `... ${attrleftover} more` : `... see less`}
        </div>
      )}
      <ChildrenDetails children={domUtils.extractDomInfo(domParent).children} />
    </div>
  );
};

export default ParentDialogBox;
