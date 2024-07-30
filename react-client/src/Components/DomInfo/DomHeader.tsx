import React from "react";

interface Props {
  tag: string,
  elementId: string,
  classNames: any,
}

const DomHeader = (props: Props) => {
  return (
    <div className="dialog-header">
      <span className="label-tag">{props.tag}</span>
      {props.elementId && <span className="">{props.elementId}</span>}
      {props.classNames.map((val: any) => (
        <span className={`${val.updated ? "highlight-div" : ""}`}>
          {val.name}
        </span>
      ))}
    </div>
  );
};

export default DomHeader;
