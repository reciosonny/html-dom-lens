import React from "react";

interface Props {
  display: any
}

const SwitchButton = (props: Props) => {
  return (
    <button id="switchButton" className="switch-button" hidden={false}>
      {props.display}
    </button>
  );
};

export default SwitchButton;
