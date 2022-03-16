import React, { useEffect, useRef, useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { forEach, isEmpty, uniq } from "lodash";
import { v4 as uuidv4 } from "uuid";

import * as domUtils from "../../utils/domUtils";

import BookmarkInfo from "./BookmarkInfo";
import SelectedDomFromBookmark from "./SelectedDomFromBookmark";

import useLocalStorageStore from "../../hooks/useLocalStorageStore";
import GlobalContext from "../../store/global-context";


const BookmarkPanel = ({ bookmarks, onRemoveBookmarkEmit }) => {
    
  const [bookmarkHidden, setBookmarkHidden] = useState(true);
  const [btnBookmarkHidden, setBtnBookmarkHidden] = useState(true);
  const [retrievedEl, setRetrievedEl] = useState({});
  const [savedElNode, setRetrievedElNode] = useState(null);

  const refSelectedDom = React.useRef(null);

  const [bookmarksStore, setBookmarksStore, getBookmarksStoreUpdates] = useLocalStorageStore('bookmarks', []);

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

  const onClickBookmarkList = async (e) => {

    // note: We should remove the child first before querying the element in `retrievedElement` variable. Otherwise the query will go wrong because of indexing
    if(savedElNode && savedElNode.contains(refSelectedDom.current)) {
      savedElNode.removeChild(refSelectedDom.current);
    }

    const selectedBookmark = bookmarksStore.find((data) => e.currentTarget.getAttribute("data-bookmark-id") === data.id);

    const elType = selectedBookmark.elem;
    
    const retrievedElement = domUtils.getElementByTagAndIndex(elType, selectedBookmark.domIndex);
    
    const focusedDomLength = document.querySelectorAll(".selected-dom").length;
    for (let i = 0; i < focusedDomLength; i++) {
      document.querySelectorAll(".selected-dom")[i].classList.remove("selected-dom");
    }

    await setRetrievedEl({ elClassNames: selectedBookmark.classes, elem: selectedBookmark.elem, elId: selectedBookmark.elId });

    retrievedElement.classList.add("selected-dom");
    retrievedElement.scrollIntoView({ block: "center" });

    if(retrievedElement.parentElement !== refSelectedDom.current) {
      retrievedElement.appendChild(refSelectedDom.current);
    }

    await setRetrievedElNode(retrievedElement);
    
  };
  
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

    return () => {
      
    }
  }, [bookmarks]);


  return (
    <div class="bookmark-panel">

      <SelectedDomFromBookmark ref={refSelectedDom} selectedDom={retrievedEl} />

      <BookmarkInfo
        bookmarkHidden={bookmarkHidden}
        onCloseBookmark={onCloseBookmark}
        bookmarks={bookmarksStore}
        onRemove={onRemoveBookmark}
        onClickBookmarkList={onClickBookmarkList}
      />

      <button
        className="bookmark-btn"
        onClick={onOpenBookmark}
        hidden={btnBookmarkHidden}
      >
        <BsFillBookmarkFill  /> &nbsp; Bookmarks
      </button>
    </div>
  );
};

export default BookmarkPanel;
