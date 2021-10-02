import React, { useeffect, useState } from "react";



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

const DomInfoDialogBox = ({ id, idx, clstag, clsname, parent, children, top, left, onClose, fontsize, fontfamily, textcolor }) => {
  const [displayArray, setdisplayArray] = useState("2");
  const handleSeemore = () => {
    setdisplayArray(children.length);
  };
  
  const leftover = children.length - displayArray -1;
  return (
    <div>
      <div
        className="dom-info-dialog-box"
        style={{
          top: `${top}px`,
          left: `${left}px`,
        }}
      >
        <button
          id="closedompeeker"
          className="close-btn-style"
          onClick={() => onClose(idx)}
        >
          X
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
          <div className="dom-dialog">Children[{children.length}]</div>
          <div className="dom-dialog-child-details">
            {children.filter(clsname => clsname.id !== "#domInfoHighlight" ).slice(0, displayArray).map((val) => (              
              <div>
                <div className="dom-details-tag">{val.tag}</div>
                {val.id}                     
                {val.class && val.class.replace(/ /g, ".")}                
              </div>
            ))}         
          </div>
          {leftover > 0 && (
            <div
              id="closedompeeker"
              className="see-more"
              onClick={handleSeemore}
            >
              ... {leftover} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomInfoDialogBox;
