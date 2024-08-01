import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  onClickClose: () => void,
}

const RoundedCloseButton = (props: Props) => {
  return (
    <div onClick={() => props.onClickClose()} className="rounded-close-btn">
      X
    </div>
  );
};

const TransparentCloseButton = (props: Props) => {
  return (
    <button type="button" className="transparent-button" onClick={() => props.onClickClose()}>
      <AiOutlineClose size={15} color="#546E7A" />
    </button>
  );
};

export { RoundedCloseButton, TransparentCloseButton };
