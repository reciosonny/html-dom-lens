import React, { useEffect, useState } from "react";
import { MdCenterFocusStrong, MdCenterFocusWeak } from "react-icons/md";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import { MdOutlineCommentBank, MdCommentBank } from "react-icons/md"; 
import { GrTree } from "react-icons/gr";
import "../../styles/domoptions.scss";

function DomOptions({ onClickBookmark, onClickFocus,onClickAnnotation, showAddBookmarkPanel, showAddAnnotationPanel, focusMode }) {
  return (
    <div className="dom-options">
      <button style={{ fontSize: "20px" }} onClick={onClickBookmark}>
        {showAddBookmarkPanel ? (
          <BsFillBookmarkFill color="#673ab7" />
        ) : (
          <BsBookmark color="#673ab7" />
        )}        
      </button>
      <button style={{ fontSize: "20px" }}>
        <GrTree />
      </button>
      <button style={{ fontSize: "20px" }}   onClick={onClickAnnotation}>
      {showAddAnnotationPanel ? (
          <MdCommentBank color="#673ab7" />
        ) : (
          <MdOutlineCommentBank color="#673ab7" />
        )}
        {/* <MdOutlineCommentBank /> */}
        {/* <BiComment />  */}
      </button>
      <button style={{ fontSize: '20px' }} onClick={onClickFocus}>
        {!focusMode && <MdCenterFocusStrong />}
        {focusMode && <MdCenterFocusWeak />}
      </button>
    </div>
  );
}

export default DomOptions;
