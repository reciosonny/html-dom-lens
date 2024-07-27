import React from "react";

interface Props {
  tag: string,
  id: string,
  classes: any,
}

const ParentDetails = ({ tag, id, classes }: Props) => {
  // const x: number = "test"
  return (
    <>
      <div className="dialog-label" style={{ marginTop: "5px" }}>
        Parent
      </div>
      <div className="dialog-parent-details">
        <div className="dom-details-tag">{tag}</div>
        {id}
        {classes.map((val: any) => `.${val}`)}
      </div>
    </>
  );
};

export default ParentDetails;
