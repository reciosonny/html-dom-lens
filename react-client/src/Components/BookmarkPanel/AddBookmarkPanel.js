import React, { useState, useEffect, useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";


import { AiOutlineClose } from "react-icons/ai";
import GlobalContext from "../../store/global-context";
import useLocalStorageStore from "../../hooks/useLocalStorageStore";
import * as domUtils from "../../utils/domUtils";


// Note: I used React memo to avoid the expensive "re-rendering" components
const AddBookmarkPanel = React.memo(({ domType, elClassNames, onSaveBookmark, onClose, domId }) => {
  const [txtInput, setTxtInput] = useState("");
  const [capturedSelectedDom, setCapturedSelectedDom] = useState(null);

  const [bookmarksStore, setBookmarksStore] = useLocalStorageStore('bookmarks', []);

  const txtInputRef = useRef(null);
  const GlobalContextData = useContext(GlobalContext); //We use Context API to avoid prop drilling

  useEffect(() => {
    setTimeout(() => {
      txtInputRef.current.focus();
    }, 300);

    setCapturedSelectedDom(GlobalContextData.selectedDom);
    
    return () => {};
  }, []);

  const onSubmitBookmark = async (e) => {
    e.preventDefault();

    
    const domIdentifier = domUtils.getUniqueElementIdentifierByTagAndIndex(capturedSelectedDom);

    const elId = capturedSelectedDom.id;
    const randomCode = uuidv4();

    let bookmarkObj = {
      id: randomCode,
      title: txtInput || domType + elClassNames,
      elem: domIdentifier.elType,
      elId,
      classes: elClassNames,
      domIndex: domIdentifier.index,
    };

    const newBookmarks = [...bookmarksStore, bookmarkObj];

    GlobalContextData.onChangeBookmarks(); //emit event to communicate with App.js

    await setBookmarksStore(newBookmarks);

    setTxtInput('');

    await onSaveBookmark();
  };


  return (
    <div className='add__bookmark-panel'>
      <span className='add__bookmark-header'>
        <h3 className='header-text'>Save Bookmark</h3>
        <button className='header__close-btn' type='button' onClick={onClose}>
          <AiOutlineClose size={14} color="#546E7A" />
        </button>
      </span>
      <form className='frm-panel' data-id={domId} onSubmit={onSubmitBookmark}>
        <input
          ref={txtInputRef}
          value={txtInput}
          onChange={(e) => setTxtInput(e.target.value)}
          type='text'
          className='txt__bookmark-name'
          placeholder='Bookmark Name'
          autoFocus
        />
      </form>
      <div className='element-description'>
        <label className='lbl-element'>{domType}</label>
        <label className='lbl-classes'>{elClassNames}</label>
      </div>
    </div>
  );
});

AddBookmarkPanel.displayName = 'AddBookmarkPanel';

export default AddBookmarkPanel;
