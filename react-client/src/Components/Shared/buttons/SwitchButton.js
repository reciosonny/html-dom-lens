import React from "react";

const SwitchButton = ({ display }) => {
  return (
    <button id="switchButton" className="switch-button" hidden={false}>
      {display}
    </button>
  );
};

export default SwitchButton;
