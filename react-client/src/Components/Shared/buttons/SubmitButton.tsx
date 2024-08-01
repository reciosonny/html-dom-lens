import React from "react";

interface Props {
  display: any
  onClickSubmit: () => void,
}

const SubmitButton = (props: Props) => {
  return (
    <button id="submitButton" className="submit-button" onClick={() => props.onClickSubmit()}>
      {props.display}
    </button>
  );
};

export default SubmitButton;
