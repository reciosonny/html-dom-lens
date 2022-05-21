import React, { useState, useEffect, useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";


import { AiOutlineClose } from "react-icons/ai";
import GlobalContext from "../../store/global-context";
import useLocalStorageStore from "../../hooks/useLocalStorageStore";
import * as domUtils from "../../utils/domUtils";


// Note: I used React memo to avoid the expensive "re-rendering" components
const AddBookmarkPanel = React.memo(({ domType, elClassNames, onSaveBookmark, onClose, domId, elementId, targetElement }) => {
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

    const domIdentifier = domUtils.getUniqueElementIdentifierByTagAndIndex(targetElement);

    const elId = targetElement.id;

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
    <div className='add-bookmark-panel'>
      <div className='add-bookmark-panel__header'>
        Save Bookmark     
        <button  type='button' onClick={onClose}>
          <AiOutlineClose size={15} color="#546E7A" />
        </button>
      </div>
      <form className='frm-panel' data-id={domId} onSubmit={onSubmitBookmark}>
        <input
          ref={txtInputRef}
          value={txtInput}
          onChange={(e) => setTxtInput(e.target.value)}
          type='text'
          className='add-bookmark-panel__input txt__bookmark-name'
          placeholder='Bookmark Name'
          autoFocus
        />
      </form>
      <div className='element-description'>
        <label className='lbl-element'>{domType}</label>
        <label className='lbl-element-id'>{elementId}</label>
        <label className='lbl-classes'>{elClassNames}</label>
      </div>
    </div>
  );
});

AddBookmarkPanel.displayName = 'AddBookmarkPanel';

export default AddBookmarkPanel;
