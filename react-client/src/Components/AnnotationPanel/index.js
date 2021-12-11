import React, { useEffect, useRef, useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { forEach, isEmpty, uniq } from "lodash";
import { v4 as uuidv4 } from "uuid";

import * as domUtils from "../../utils/domUtils";

import AddAnnotationPanel from "./AddAnnotationPanel";

// import AddBookmarkPanel from "./AddBookmarkPanel";
// import BookmarkInfo from "./BookmarkInfo";
// import SelectedDomFromBookmark from "./SelectedDomFromBookmark";
import useBookmarksStore from "../../hooks/useBookmarksStore";
import { RiH1 } from "react-icons/ri";

const AnnotationPanel = ({ elClassNames, domType, showAddAnnotationPanel, onCloseAddAnnotation, x, y, domId, domTarget }) => {
    // debugger
  const [annotationHidden, setannotationHidden] = useState(true);
  // const [btnBookmarkHidden, setBtnBookmarkHidden] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [retrievedEl, setRetrievedEl] = useState({});
  const [savedElNode, setRetrievedElNode] = useState(null);

  const refSelectedDom = React.useRef(null);

  const bookmarksStore = useBookmarksStore();

  const onOpenAnnotation = (e) => {
    setannotationHidden(false);
    // setBtnBookmarkHidden(true);
  };

  const onCloseAnnotation = (e) => {
    setannotationHidden(true);
    // setBtnBookmarkHidden(false);

    onCloseAddAnnotation();
  };

  const onRemoveBookmark = (e) => {
    const selectedBookmarkIdx = bookmarksStore.findIndex((data) => data.id === e.currentTarget.getAttribute("data-bookmark-id"));

    if (selectedBookmarkIdx !== -1) {
      bookmarksStore.splice(selectedBookmarkIdx, 1);

      setBookmarks(bookmarksStore);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarksStore));

      if (bookmarks.length === 0 || bookmarksStore.length === 0) {
        // setBookmarkHidden(true);
        // setBtnBookmarkHidden(false);
        // localStorage.removeItem("bookmarks");
      }
    }
  };

  const saveAnnotation = async (e) => {
    e.preventDefault();

    // const domIdentifier =
    //   domUtils.getUniqueElementIdentifierByTagAndIndex(domTarget);

    // const element =
    //   e.target.parentElement.querySelector(".lbl-element").innerText;
    // const classes =
    //   e.target.parentElement.querySelector(".lbl-classes").innerText;
    // const elId = domTarget.id;
    // const randomCode = uuidv4();

    // let txtVal = e.target.querySelector("input").value;

    // let bookmarkObj = {
    //   id: randomCode,
    //   title: txtVal,
    //   elem: domIdentifier.elType,
    //   elId,
    //   classes,
    //   domIndex: domIdentifier.index,
    // };

    // if (!isEmpty(txtVal)) {
    //   bookmarkObj.title = txtVal;
    // } else {
    //   bookmarkObj.title = element + classes;
    // }

    // bookmarksStore.push(bookmarkObj);

    // await setBookmarks((oldBookmarks) => [...oldBookmarks, bookmarksStore]);

    // localStorage.setItem("bookmarks", JSON.stringify(bookmarksStore));

    // e.target.querySelector("input").value = "";

    onCloseAddAnnotation();
  };

  const onClickBookmarkList = async (e) => {

    // note: We should remove the child first before querying the element in `retrievedElement` variable. Otherwise the query will go wrong because of indexing
    if(savedElNode && savedElNode.contains(refSelectedDom.current.base)) {
      savedElNode.removeChild(refSelectedDom.current.base);
    }

    const selectedBookmark = bookmarks.find((data) => e.currentTarget.getAttribute("data-bookmark-id") === data.id);

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
    let savedBookmarks = localStorage.getItem("bookmarks")
      ? JSON.parse(localStorage.getItem("bookmarks"))
      : [];
    setBookmarks(savedBookmarks);

    if (savedBookmarks.length !== 0 && annotationHidden) {
      // setBtnBookmarkHidden(false);
      setannotationHidden(true);
    } else {
      // setBtnBookmarkHidden(true);
    }
  }, [bookmarks.length]);

  return (
    <div class="annotation-panel">
      
     {showAddAnnotationPanel && (
        <AddAnnotationPanel
          domType={domType}
          elClassNames={elClassNames}
          saveAnnotation={saveAnnotation}
          onClose={onCloseAddAnnotation}
          x={x}
          y={y}
          domId={domId}
        />
      )}
    </div>
  );
};

export default AnnotationPanel;
