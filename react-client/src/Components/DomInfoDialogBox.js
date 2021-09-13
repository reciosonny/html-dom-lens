import React, { useeffect, useState } from "react";

const DomInfoDialogBox = ({ id,idx,clsname,parentId,parentClass,children,top,left,onClose}) => {
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
          <div className="dom-basic">Element ID: {id}</div>
          <div className="dom-basic">Class: {clsname}</div>
          <div className="dom-dialog">Parent ID:</div>
          <div className="dom-details">{parentId}</div>
          <div className="dom-dialog">Children[{children.length}]</div>
          <div className="dom-details" align="center">
            <table>
              <tr>
                <td className="details-table">
                  <p> Child ID</p>
                  <ul>
                    {children.slice(0, displayArray).map((val) => (
                      <li>{val.id}</li>
                    ))}
                  </ul>
                </td>

                <td className="details-table">
                  <p>Child classes:</p>
                  <ul>
                    {children.slice(0, displayArray).map((val) => (
                      <li>{val.class}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </table>
          </div>
          <div id="closedompeeker" className="see-more" onClick={handleSeemore}>
            ... {leftover} more
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomInfoDialogBox;
