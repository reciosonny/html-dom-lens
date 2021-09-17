import React, { useeffect, useState } from "react";

const DomInfoDialogBox = ({ id,idx,clstag,clsname,parenttag,parentId,parentClass,children,top, left, onClose,fontsize, fontfamily,textcolor
}) => {
  const [displayArray, setdisplayArray] = useState("2");
  const handleSeemore = () => {
    setdisplayArray(children.length);
  };

  const leftover = children.length - displayArray;
  return (
    <div>
      <div
        className="dom-info-dialog-box"
        style={{
          top: `${top}px`,
          left: `${left}px`,
        }}
      >
        <div className="dom-close-btn">
          <button
            id="closedompeeker"
            className="close-btn-style"
            onClick={() => onClose(idx)}
          >
            X
          </button>
        </div>
        <div>       
          <div className="dom-header">
            <div className="dom-header-tag"> {clstag}</div>
            {id}{clsname}
          </div>
          <table>
            <tr>
              <td>
                <div className="dom-styles-details"> {fontsize}</div>
                <div className="dom-styles">Size</div>
              </td>
              <td>
                <div
                  className="display-dot"
                  style={{
                   
                    background: textcolor,
                   
                  }}
                ></div>
              </td>
              <td>
                <div className="dom-styles-details"> {textcolor}</div>
                <div className="dom-styles">Color</div>
              </td>
            </tr>
          </table>
          <div className="dom-styles-details"> {fontfamily}</div>
          <div className="dom-styles">Font Family</div>

          <div className="dom-dialog">Parent </div>

          <div className="dom-dialog-parent-details">
            <div className="dom-details-tag">{parenttag}</div>
            {parentId}
            {parentClass}
          </div>
          <div className="dom-dialog">Children[{children.length}]</div>
          <div className="dom-dialog-child-details" >             
              {children.slice(0, displayArray).map((val) => (
               
               <div>
                 <div  className="dom-details-tag">
                   {val.childtag}
                   </div>
                  {val.id}
                  {val.class}
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
