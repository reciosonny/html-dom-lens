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
  const [childrenArray, setchildrenArray] = useState("2");
  const [attributeArray, setattributeArray] = useState("2");
  const [seemoreAttr, setseemoreAttr] = useState(false);
  const [seemoreChild, setseemoreChild] = useState(false);

  const handleSeeMoreChild = () => {
    seemoreChild !== true ? setchildrenArray(children.length)  : setchildrenArray("2");
    setseemoreChild(!seemoreChild);
  };

  const handleSeeMoreAttr = () => {   
    seemoreAttr !== true ? setattributeArray(dataAttributes.length)  : setattributeArray("2");
    setseemoreAttr(!seemoreAttr);
  };

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
           {/* <div className="attributecontainer">  */}
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
          {dataAttributes.length > 2 ?(            
            <div
              id="closedompeeker"
              className="see-more"
              onClick={handleSeeMoreAttr}
            >
              {attrleftover > 0 ? `... ${attrleftover} more` : `... see less`}
            </div>
          ) : null}                    
          <div className="dom-dialog">Children[{children.length-1}]</div>
          <div className="dom-dialog-child-details">
            {children.filter(clsname => clsname.id !== "#domInfoHighlight" ).slice(0, childrenArray).map((val) => (              
              <div>
                <div className="dom-details-tag">{val.tag}</div>
                {val.id}                             
                {val.class && val.class.replace(/ /g, ".")  }        
                <br />        
              </div>
            ))}         
          </div>          
          {children.length - 1 > 2 ? (            
            <div
              id="closedompeeker"
              className="see-more"
              onClick={handleSeeMoreChild}
            >              
              {leftover > 0 ? `... ${leftover} more` : `... see less`}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DomInfoDialogBox;
