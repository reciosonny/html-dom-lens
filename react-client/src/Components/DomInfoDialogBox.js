import React from "react";

const DomInfoDialogBox = ({
  id,
  idx,
  clsname,
  parentId,
  parentClass,
  children,
  top,
  left,
  onClose,
  seeMore,
  displayArr
  
}) => {
  return (
    <div>
      <div
        className="dom-info-dialog-box"
        style={{
          top: `${top}px`,
          left: `${left}px`,
        }}
      >
        <div style="float:right">
          <button id="closedompeeker" onClick={() => onClose(idx)}>
            X
          </button>
        </div>
        <div>
          <h1>Element ID: {id}</h1>
          <h2>Class: {clsname}</h2>
          <h2>Parent ID: {parentId}</h2>
          <h2>Parent Class: {parentClass}</h2>

          <h2># of Children Element: {children.length}</h2>

          <p>Child elements </p>
          <table align = "center">
            <tr>
              <td>
                <p> Child ID</p>
                <ul>
                  {children.slice(0,displayArr).map((val) => (
                    <li>{val.id}</li>
                  ))}
                </ul>
              </td>

              <td>
                <p>Child classes:</p>
                <ul>
                  {children.slice(0,displayArr).map((val) => (
                    <li>{val.class}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </table>
          <button id="closedompeeker" style={{cursor: "pointer"}} onClick={seeMore} >
            see more
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomInfoDialogBox;
