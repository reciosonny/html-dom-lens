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

const DomInfoDialogBox = ({ id, idx, clstag, clsname, parent, children, top, left, onClose, fontsize, fontfamily, textcolor, borderclr, uniqueID, dataAttributes  }) => {
  const [seemoreAttr, setseemoreAttr] = useState(true);
  const [seemoreChild, setseemoreChild] = useState(true);

  const handleSeeMoreChild = () => {
    setseemoreChild(!seemoreChild);
  };

  const handleSeeMoreAttr = () => {   
    setseemoreAttr(!seemoreAttr);
  };

  const numChildrenToDisplay = !seemoreChild ? children.length : 2 ;
  const numAttibToDisplay = !seemoreAttr ? dataAttributes.length : 2 ;
  const leftover = children.length  - 3;
  const attrleftover = dataAttributes.length - 2;

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
              {dataAttributes.slice(0, numAttibToDisplay).map((val) => (
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
          {dataAttributes.length > 2 &&(            
            <div
              id="closedompeeker"
              className="see-more"
              onClick={handleSeeMoreAttr}
            >
              {seemoreAttr  ? `... ${attrleftover} more` : `... see less`}
            </div>
          ) }                    
          <div className="dom-dialog">Children[{children.length-1}]</div>
          <div className="dom-dialog-child-details">
            {children.filter(clsname => clsname.id !== "#domInfoHighlight" ).slice(0, numChildrenToDisplay).map((val) => (              
              <div>
                <div className="dom-details-tag">{val.tag}</div>
                {val.id}                             
                {val.class && val.class.replace(/  /g, ".").replace(/ /g, ".")  }        
                <br />        
              </div>
            ))}         
          </div>          
          {children.length - 1 > 2 && (            
            <div
              id="closedompeeker"
              className="see-more"
              onClick={handleSeeMoreChild}
            >                        
              {seemoreChild  ? `... ${leftover} more` : `... see less`}
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default DomInfoDialogBox;
