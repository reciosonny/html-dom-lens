import React from "react";

const SubmitButton = ({ display, onClickSubmit }) => {
  return (
    <button id="submitButton" className="submit-button" onClick={onClickSubmit}>
      {display}
    </button>
  );
};

export default SubmitButton;
