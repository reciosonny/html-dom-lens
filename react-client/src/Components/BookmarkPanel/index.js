import React, { useEffect, useRef, useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { forEach, isEmpty, uniq } from "lodash";
import { v4 as uuidv4 } from "uuid";

import * as domUtils from "../../utils/domUtils";

import AddBookmarkPanel from "./AddBookmarkPanel";
import BookmarkInfo from "./BookmarkInfo";
import SelectedDomFromBookmark from "./SelectedDomFromBookmark";

import useLocalStorageStore from "../../hooks/useLocalStorageStore";

const BookmarkPanel = ({ elClassNames, domType, showAddBookmarkPanel, onCloseAddBookmark,  x, y, domId, domTarget }) => {
    
  const [bookmarkHidden, setBookmarkHidden] = useState(true);
  const [btnBookmarkHidden, setBtnBookmarkHidden] = useState(true);
  const [retrievedEl, setRetrievedEl] = useState({});
  const [savedElNode, setRetrievedElNode] = useState(null);
  const [latestDialogSize, setLatestDialogSize] = useState(null);

  const refSelectedDom = React.useRef(null);

  // modified current implementation getting the latest size of dom-info-dialog-box
  let dialogboxCount = document.querySelectorAll('.dom-info-dialog-box').length;
  if (dialogboxCount > 0)
  {
    let getLatestDialogBox = document.querySelectorAll('.dom-info-dialog-box')[dialogboxCount - 1]
    let data = getLatestDialogBox.offsetHeight;
    setLatestDialogSize(data);
  }

  const [bookmarksStore, setBookmarksStore] = useLocalStorageStore('bookmarks', []);

  const onOpenBookmark = (e) => {
    setBookmarkHidden(false);
    setBtnBookmarkHidden(true);
  };

  const onCloseBookmark = (e) => {
    setBookmarkHidden(true);
    setBtnBookmarkHidden(false);

    onCloseAddBookmark();
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
    }
  };

  const saveBookmark = async (e) => {
    e.preventDefault();

    const elParent = e.target.parentElement;
    const domIdentifier = domUtils.getUniqueElementIdentifierByTagAndIndex(domTarget);

    const [element, classes] = ['.lbl-element', '.lbl-classes']
      .reduce((acc, curr) => [...acc, elParent.querySelector(curr).innerText], []);
    
    const elId = domTarget.id;
    const randomCode = uuidv4();

    let txtVal = e.target.querySelector("input").value;

    let bookmarkObj = {
      id: randomCode,
      title: txtVal,
      elem: domIdentifier.elType,
      elId,
      classes,
      domIndex: domIdentifier.index,
    };

    if (!isEmpty(txtVal)) {
      bookmarkObj.title = txtVal;
    } else {
      bookmarkObj.title = element + classes;
    }

    const newBookmarks = [...bookmarksStore, bookmarkObj];

    await setBookmarksStore(newBookmarks);

    e.target.querySelector("input").value = "";

    onCloseAddBookmark();
  };

  const onClickBookmarkList = async (e) => {

    // note: We should remove the child first before querying the element in `retrievedElement` variable. Otherwise the query will go wrong because of indexing
    if(savedElNode && savedElNode.contains(refSelectedDom.current.base)) {
      savedElNode.removeChild(refSelectedDom.current.base);
    }

    const selectedBookmark = bookmarksStore.find((data) => e.currentTarget.getAttribute("data-bookmark-id") === data.id);

    const focusedDomLength = document.querySelectorAll(".selected-dom").length;
    var elType = selectedBookmark.elem;

    const retrievedElement = domUtils.getElementByTagAndIndex(elType, selectedBookmark.domIndex);

    for (let i = 0; i < focusedDomLength; i++) {
      document.querySelectorAll(".selected-dom")[i].classList.remove("selected-dom");
    }

    await setRetrievedEl({ elClassNames: selectedBookmark.classes, elem: selectedBookmark.elem, elId: selectedBookmark.elId });

    retrievedElement.classList.add("selected-dom");
    retrievedElement.scrollIntoView({ block: "center" });

    if(retrievedElement.parentElement !== refSelectedDom.current.base) {
        retrievedElement.appendChild(refSelectedDom.current.base);
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

  return (
    <div class="bookmark-panel">
      {showAddBookmarkPanel && (
        <AddBookmarkPanel
          domType={domType}
          elClassNames={elClassNames}
          saveBookmark={saveBookmark}
          onClose={onCloseAddBookmark}
          dialogSize={latestDialogSize}
          x={x}
          y={y}
          domId={domId}
        />
      )}

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
        <BsFillBookmarkFill />
        &nbsp; Bookmarks
      </button>
    </div>
  );
};

export default BookmarkPanel;
