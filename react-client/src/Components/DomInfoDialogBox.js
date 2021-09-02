import React from "react";

const DomInfoDialogBox = ({
  id,
  clsname,
  parentId,
  parentClass,
  // count,
  child,
  // coordinates,
  top,
  left,
  closedialog,
}) => {
  return (
    <div>
      <div
        style={{
          height: "550px",
          width: "350px",
          background: "white",
          color: "blue",
          fontWeight: "800 !important",
          zIndex: "999",
          border: "3px solid green",
          borderRadius: "20px",
          position: "absolute",
          // top: `${coordinates.top}px`,
          // left: `${coordinates.left}px`,
          top: `${top}px`,
          left: `${left}px`,
        }}
      >
        <div style="float:right">
          <button id="closedompeeker" onClick={closedialog}>
            X
          </button>
        </div>

        <h1>Element ID: {id}</h1>
        <h2>Class: {clsname}</h2>
        <h2>Parent ID: {parentId}</h2>
        <h2>Parent Class: {parentClass}</h2>
        <h2># of Children Element: {child.totalCount}</h2>

        <p>Child element ids:</p>

        <ul>
          {child.ids.map((val) => (
            <li>{val}</li>
          ))}
        </ul>

        <p>Child element classes:</p>
        <ul>
          {child.classes.map((val) => (
            <li>{val}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DomInfoDialogBox;
