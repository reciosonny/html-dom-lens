import React from "react";
import { SubmitButtonModel } from "../../../model/Shared";

const SubmitButton = ({ display, onClickSubmit }: SubmitButtonModel) => {
  return (
    <button id="submitButton" className="submit-button" onClick={() => onClickSubmit()}>
      {display}
    </button>
  );
};

export default SubmitButton;
