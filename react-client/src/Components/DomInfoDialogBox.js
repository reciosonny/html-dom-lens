import React, { useeffect, useState } from "react";
import DomOptions from "./DomOptions";

const FontColorDetails = ({ textcolor }) => {

  return (
    <React.Fragment>
      <div
        className="display-dot"
        style={{
          background: textcolor,
        }}
      ></div> {" "}
      <span style={{ color: '#455A64' }}>{textcolor}</span>
    </React.Fragment>
  )
}

const DomInfoDialogBox = ({ id, idx, clstag, clsname, parent, children, top, left, onClose, fontsize,
  fontfamily, textcolor, borderclr, uniqueID, dataAttributes, onClickFocus, domElement, focusMode }) => {
  const [childrenArray, setchildrenArray] = useState("2");
  const [attributeArray, setattributeArray] = useState("2");
  const [showAddBookmarkPanel, setShowAddBookmarkPanel] = useState(false);

  const handleSeemore = () => {
    setchildrenArray(children.length);
  };
  const handleSeeless = () => {
    setchildrenArray("2");
  };
  const handleSeemoreAttr = () => {
    setattributeArray(dataAttributes.length);
  };
  const handleSeelessAttr = () => {
    setattributeArray("2");
  };

  const onClickBookmark = () => {
    setShowAddBookmarkPanel(!showAddBookmarkPanel);
  }

  const leftover = children.length - childrenArray - 1;
  const attrleftover = dataAttributes.length - attributeArray;

  return (
    <div>
      <div
        className="dom-info-dialog-box"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          border: `3px solid ${borderclr}`,
        }}
      >
        <button
          id="closedompeeker"
          className="close-btn-style"
          onClick={() => onClose(idx, id, uniqueID)}
        >
          x
        </button>
        <div>
          <div className="dom-header">
            <span className="dom-header-tag">{clstag}</span>
            {id && <span className="dom-header-details">{id}</span>}
            {clsname.filter(clsnames => clsnames.clsName !== ".focused-dom").map((val) => (
              <span className="dom-header-details">{val.clsName}</span>
            ))}
          </div>
          <div className="flex-row">
            <div className="flex-column">
              <div className="dom-styles-details"> {fontsize}</div>
              <div className="dom-styles">Size</div>
            </div>
            <div className="flex-column">
              <div className="dom-styles-details">
                <FontColorDetails textcolor={textcolor} />
              </div>
              <div className="dom-styles">Color</div>
            </div>
          </div>
          <div className="dom-styles-details"> {fontfamily}</div>
          <div className="dom-styles">Font Family</div>
          <div className="dom-dialog">Parent </div>
          <div className="dom-dialog-parent-details">
            <div className="dom-details-tag">{parent.tag}</div>
            {parent.id}
            {parent.classes.map(val => `.${val}`)}
          </div>
          <div className="dom-dialog">data-* attributes </div>
          <div className="dom-dialog-child-details">
            {dataAttributes.slice(0, attributeArray).map((val) => (
              <div className="attributecontainer">
                <div className="attributeitems">
                  {val.key}
                </div>
                <div className="attributeitems">
                  {val.value}
                </div>
              </div>
            ))}
          </div>
          {dataAttributes.length > 2 ? (
            attrleftover > 0 ? (
              <div
                id="closedompeeker"
                className="see-more"
                onClick={handleSeemoreAttr}
              >
                ... {attrleftover} more
              </div>
            ) : (
              <div
                id="closedompeeker"
                className="see-more"
                onClick={handleSeelessAttr}
              >
                ... see less
              </div>
            )
          ) : null}
          <div className="dom-dialog">Children[{children.length - 1}]</div>
          <div className="dom-dialog-child-details">
            {children.filter(clsname => clsname.id !== "#domInfoHighlight").slice(0, childrenArray).map((val) => (
              <div>
                <div className="dom-details-tag">{val.tag}</div>
                {val.id}                             
                {val.class && val.class.replace(/ /g, ".")  }        
                <br />        
              </div >
            ))}
          </div>
          {
            children.length - 1 > 2 ? (
              leftover > 0 ? (
                <div
                  id="closedompeeker"
                  className="see-more"
                  onClick={handleSeemore}
                >
                  ... {leftover} more
                </div>
              ) : (
                <div
                  id="closedompeeker"
                  className="see-more"
                  onClick={handleSeeless}
                >
                  ... see less
                </div>
              )
            ) : null
          }
        </div>
        <DomOptions focusMode={focusMode} onClickFocus={() => onClickFocus(domElement)} onClickBookmark={onClickBookmark} showAddBookmarkPanel={showAddBookmarkPanel} />

      </div >
    </div >
  );
};

export default DomInfoDialogBox;
