import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const RoundedCloseButton = ({ onClickClose }) => {
  return (
    <div onClick={onClickClose} className="rounded-close-btn">
      X
    </div>
  );
};

const TransparentCloseButton = ({ onClickClose }) => {
  return (
    <button type="button" className="transparent-button" onClick={onClickClose}>
      <AiOutlineClose size={15} color="#546E7A" />
    </button>
  );
};

export { RoundedCloseButton, TransparentCloseButton };
