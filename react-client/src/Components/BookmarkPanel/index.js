import React, { useEffect, useRef, useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { forEach, isEmpty, uniq } from "lodash";
import { v4 as uuidv4 } from "uuid";

import * as domUtils from "../../utils/domUtils";

import BookmarkInfo from "./BookmarkInfo";
import SelectedDomFromBookmark from "./SelectedDomFromBookmark";

import useLocalStorageStore from "../../hooks/useLocalStorageStore";
import GlobalContext from "../../store/global-context";
import { AiOutlineClose } from "react-icons/ai";
import BookmarkItem from "./BookmarkItem";

const BookmarkPanel = ({ bookmarks, onRemoveBookmarkEmit }) => {
  const [bookmarkHidden, setBookmarkHidden] = useState(true);
  const [btnBookmarkHidden, setBtnBookmarkHidden] = useState(true);
  const [retrievedEl, setRetrievedEl] = useState({});
  const [savedElNode, setRetrievedElNode] = useState(null);

  const refSelectedDom = React.useRef(null);

  const [bookmarksStore, setBookmarksStore, getBookmarksStoreUpdates] = useLocalStorageStore("bookmarks", []);

  const onOpenBookmark = (e) => {
    setBookmarkHidden(false);
    setBtnBookmarkHidden(true);
  };

  const onCloseBookmark = (e) => {
    setBookmarkHidden(true);
    setBtnBookmarkHidden(false);
  };

  const onRemoveBookmark = (e) => {
    const selectedBookmarkIdx = bookmarksStore.findIndex((data) => data.id === e.currentTarget.getAttribute("data-bookmark-id"));

    if (selectedBookmarkIdx !== -1) {
      const newBookmarks = bookmarksStore.filter((x, idx) => idx !== selectedBookmarkIdx);

      setBookmarksStore(newBookmarks);

      if (newBookmarks.length === 0) {
        setBookmarkHidden(true);
        setBtnBookmarkHidden(false);
        setBookmarksStore(null);
      }
      onRemoveBookmarkEmit();
    }
  };

  const onEditBookmark = (e, updatedTitle, bookmarkID) => {
    e.preventDefault();
    const duplicateBookmark = bookmarksStore.find((obj) => obj.id === bookmarkID);
    duplicateBookmark.title = updatedTitle;
    setBookmarksStore(bookmarksStore);
  };

  const onClickBookmark = async (e) => {
    // alert('clicking bookmark');
  };

  // bookmark navigation happens here...
  const onHoverBookmark = async (e) => {
    const selectedBookmark = bookmarksStore.find((data) => e.currentTarget.getAttribute("data-bookmark-id") === data.id);

    const elType = selectedBookmark.elem;

    const retrievedElement = domUtils.getElementByTagAndIndex(elType, selectedBookmark.domIndex);

    const focusedDomLength = document.querySelectorAll(".focused-dom").length;
    for (let i = 0; i < focusedDomLength; i++) {
      document.querySelectorAll(".focused-dom")[i].classList.remove("focused-dom");
    }

    await setRetrievedEl({ elClassNames: selectedBookmark.classes, elem: selectedBookmark.elem, elId: selectedBookmark.elId });

    retrievedElement.classList.add("focused-dom");
    retrievedElement.scrollIntoView({ block: "center", behavior: 'smooth' });

    await setRetrievedElNode(retrievedElement);
  }

  useEffect(() => {
    if (bookmarksStore.length !== 0 && bookmarkHidden) {
      setBtnBookmarkHidden(false);
      setBookmarkHidden(true);
    } else {
      setBtnBookmarkHidden(true);
    }
  }, [bookmarksStore]);

  // get localStorage updates for bookmarks when bookmarks data is changed in App.js
  useEffect(() => {
    getBookmarksStoreUpdates();

    return () => {};
  }, [bookmarks]);

  return (
    <div className="bookmark-panel">
      <SelectedDomFromBookmark ref={refSelectedDom} selectedDom={retrievedEl} />

      <div className='card-bookmark' hidden={bookmarkHidden}>
        <span className='bookmark-header'>
          <label className='header-text'>Bookmarks from this page</label>
          <button id='btnClose' className='header__close-btn' type='button' onClick={onCloseBookmark}>
            <AiOutlineClose size={14} color="#263238" />
          </button>
        </span>
        <div className='bookmark-body'>
          {bookmarks.map((data, index) => (
            <BookmarkItem
              data={data}
              index={index}
              onEdit={onEditBookmark}
              onRemove={onRemoveBookmark}
              onClick={onClickBookmark}
              onHover={onHoverBookmark}
            />
          ))}
        </div>
      </div>

      <button className="bookmark-btn" onClick={onOpenBookmark} hidden={btnBookmarkHidden}>
        <BsFillBookmarkFill /> &nbsp; Bookmarks
      </button>
    </div>
  );
};

export default BookmarkPanel;
