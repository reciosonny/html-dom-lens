import React from "react";

const ParentDetails = ({ tag, id, classes, displayDetails }) => (
  <React.Fragment>
    <div className="dom-dialog">Parent</div>
    <div className="dom-dialog-parent-details" onClick={displayDetails}>
      <div className="dom-details-tag">{tag}</div>
      {id}
      {classes.map((val) => {
        return val.toString().charAt(0) === "." || val.toString().trim() === ""
          ? val : `.${val}`;
      })}
    </div>
  </React.Fragment>
);

export default ParentDetails;
