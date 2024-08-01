import React from "react";

interface ColorProps {
  color: string
}

interface DomProps {
  fontsize: string,
  textcolor: string,
  backgroundColor: string,
  fontfamily: string,
}

const ColorDetails = (props: ColorProps) => {
  return (
    <>
      <div
        className="display-dot"
        style={{
          background: props.color,
        }}
      ></div>
      <span style={{ color: "#455A64" }}>{props.color}</span>
    </>
  );
};

const DomDetails = (props: DomProps) => {
  return (
    <>
      <div className="flex-row">
        <div className="flex-column">
          <div className="dialog-details"> {props.fontsize}</div>
          <div className="dialog-label">Size</div>
        </div>
        <div className="flex-column">
          <div className="dialog-details">
            <ColorDetails color={props.textcolor} />
          </div>
          <div className="dialog-label">Text-Color</div>
        </div>
        <div className="flex-column">
          <div className="dialog-details">
            <ColorDetails color={props.backgroundColor} />
          </div>
          <div className="dialog-label">Background-Color</div>
        </div>
      </div>
      <div className="dialog-details">{props.fontfamily}</div>
      <div className="dialog-label">Font Family</div>
    </>
  );
};

export default DomDetails;
