import React from "react";

const DomHeader = ({ tag, elementId, classNames }) => {
  return (
    <div className="dialog-header">
      <span className="label-tag">{tag}</span>
      {elementId && <span className="">{elementId}</span>}
      {classNames.map((val) => (
        <span className={`${val.updated ? "highlight-div" : ""}`}>
          {val.name}
        </span>
      ))}
    </div>
  );
};

export default DomHeader;
