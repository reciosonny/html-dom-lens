import React from "react";
import { SwitchButtonModal } from "../../../model/Shared";

const SwitchButton = ({ display }: SwitchButtonModal) => {
  return (
    <button id="switchButton" className="switch-button" hidden={false}>
      {display}
    </button>
  );
};

export default SwitchButton;
