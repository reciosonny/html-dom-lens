import React from "react";

const Modal = ({
  id,
  clsname,
  parentId,
  parentClass,
  count,
  child,
  coordinates,
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
          top: `${coordinates.top}px`,
          left: `${coordinates.left}px`,
        }}
      >
        <h1>Element ID: {id}</h1>
        <h2>Class: {clsname}</h2>
        <h2>Parent ID: {parentId}</h2>
        <h2>Parent Class: {parentClass}</h2>
        <h2># of Children Element: {count}</h2>
        <p> id of Children Element:</p>
        
        <ul>
          {child.id.map((val) => (
            <li>{val}</li>
          ))}
        </ul>

        <p> Class of Children Element:</p>
       
        <ul>
          {child.classes.map((val) => (
            <li>{val}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
