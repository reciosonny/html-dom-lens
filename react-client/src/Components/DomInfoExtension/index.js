import React, { useState } from "react";
import * as domUtils from "../../utils/domUtils";
import ColorDetails from "../ColorDetails";
import ChildrenDetails from "../DomInfoDialogBox/ChildrenDetails";
import ParentDetails from "../DomInfoDialogBox/ParentDetails";

export default function DomInfoExtension({extendedDom, extendedAttributes, showParent}) {
  const [seeMoreAttr, setSeeMoreAttr] = useState(true);
  const numAttibToDisplay = !seeMoreAttr ? extendedAttributes.length : 2;
  const attrleftover = extendedAttributes.length - 2;

  const handleSeeMoreAttr = () => {
    setSeeMoreAttr(!seeMoreAttr);
  };

  return (
    <div className="extended-dialog-box">
      <span className="dom-header-tag">
        {domUtils.extractDomInfo(extendedDom).tag}
      </span>
      <span className="dom-header-details">
        {domUtils.extractDomInfo(extendedDom).id}
        {domUtils.extractDomInfo(extendedDom).classNames.map((val) => (
          <span>{val}</span>
        ))}
      </span>
      <div className="flex-row">
        <div className="flex-column">
          <div className="dom-styles-details">
            {" "}
            {domUtils.extractDomInfo(extendedDom).size}
          </div>
          <div className="dom-styles">Size</div>
        </div>
        <div className="flex-column">
          <div className="dom-styles-details">
            <ColorDetails
              color={domUtils.extractDomInfo(extendedDom).textcolor}
            />
          </div>
          <div className="dom-styles">Text-Color</div>
        </div>
        <div className="flex-column">
          <div className="dom-styles-details">
            <ColorDetails
              color={domUtils.extractDomInfo(extendedDom).backgroundColor}
            />
          </div>
          <div className="dom-styles">Background-Color</div>
        </div>
      </div>
      <div className="dom-styles-details">
        {domUtils.extractDomInfo(extendedDom).family}
      </div>
      <div className="dom-styles">Font Family</div>
      {showParent && (
        <ParentDetails
          tag={domUtils.extractDomInfo(extendedDom.parentElement).tag}
          id={domUtils.extractDomInfo(extendedDom.parentElement).id}
          classes={
            domUtils.extractDomInfo(extendedDom.parentElement).classNames
          }
        />
      )}
      <div className="dom-dialog">data-* attributes </div>
      <div className="dom-dialog-child-details">
        {extendedAttributes.slice(0, numAttibToDisplay).map((val) => (
          <div className="attributecontainer">
            <div className="attributeitems">{val.key}</div>
            <div className="attributeitems">{val.value}</div>
          </div>
        ))}
      </div>
      {extendedAttributes.length > 2 && (
        <div id="closeDom" className="see-more" onClick={handleSeeMoreAttr}>
          {seeMoreAttr ? `... ${attrleftover} more` : `... see less`}
        </div>
      )}
      <ChildrenDetails
        children={domUtils.extractDomInfo(extendedDom).children}
      />
    </div>
  );
}

