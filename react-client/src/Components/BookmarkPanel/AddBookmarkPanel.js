import React, { useState, useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";



const AddBookmarkPanel = ({ domType, elClassNames, onSaveBookmark, onClose, x, y, domId }) => {


  useEffect(() => {
    
  
    return () => {
      
    }
  }, []);
  

  return (
    <div className='add__bookmark-panel'>
      <span className='header'>
        <h3 className='header-text'>Save Bookmark</h3>
        <button className='header__close-btn' type='button' onClick={onClose}>
          <AiOutlineClose size={14} />
        </button>
      </span>
      <form className='frm-panel' data-id={domId} onSubmit={onSaveBookmark}>
        <input type='text' className='txt__bookmark-name' placeholder='Bookmark Name' autoFocus />
      </form>
      <div className='element-description'>
        <label className='lbl-element'>{domType}</label>
        <label className='lbl-classes'>{elClassNames}</label>
      </div>
    </div>
  );
}

export default AddBookmarkPanel;
