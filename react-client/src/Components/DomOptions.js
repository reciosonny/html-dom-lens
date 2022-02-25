import React, { useEffect, useState } from "react";
import { MdCenterFocusStrong, MdCenterFocusWeak } from "react-icons/md";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { GrTree } from "react-icons/gr";
import "../../styles/domoptions.scss";

function DomOptions({ onClickBookmark, onClickFocus, showAddBookmarkIcon, focusMode }) {

  return (
    <div className="dom-options">
      <button style={{ fontSize: "20px" }} onClick={onClickBookmark}>
        {showAddBookmarkIcon && <BsFillBookmarkFill color="#673ab7" />}
        {!showAddBookmarkIcon && <BsBookmark color="#673ab7" />}
      </button>
      <button style={{ fontSize: "20px" }} className= "grDesign">
        <GrTree />
      </button>
      <button  style={{ fontSize: "20px"}} >
        <BiComment color="#673ab7"/>
      </button>
      <button style={{ fontSize: '20px' }} onClick={onClickFocus}>
        {!focusMode && <MdCenterFocusStrong color="#673ab7"/>}
        {focusMode && <MdCenterFocusWeak color="#673ab7"/>}
      </button>    
    </div>
  );
}

export default DomOptions;
