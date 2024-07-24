import React from "react";

const ParentDetails = ({ tag, id, classes }) => {
  return (
    <>
      <div className="dialog-label" style={{ marginTop: "5px" }}>
        Parent
      </div>
      <div className="dialog-parent-details">
        <div className="dom-details-tag">{tag}</div>
        {id}
        {classes.map((val) => `.${val}`)}
      </div>
    </>
  );
};

export default ParentDetails;
