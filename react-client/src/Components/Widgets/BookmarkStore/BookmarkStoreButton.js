import React from "react";
import { BsFillBookmarkFill } from "react-icons/bs";

const BookmarkStoreButton = ({ onOpenBookmark }) => {
  return (
    <button
      className="bookmark-btn"
      onClick={onOpenBookmark}     
    >
      <BsFillBookmarkFill /> &nbsp; Bookmarks
    </button>
  );
};

export default BookmarkStoreButton;
