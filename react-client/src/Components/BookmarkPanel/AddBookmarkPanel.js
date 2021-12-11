import React from "react";

import { AiOutlineClose } from "react-icons/ai";

const AddBookmarkPanel = ({ domType, elClassNames, saveBookmark, onClose, x, y, domId }) => (
  // <div className='add__bookmark-panel' style={{ top: y + 173, left: x + 20 }}>
      <div className='add__bookmark-panel' style={{ top: y + 270, left: x + 15 }}>  
    <span className='header'>
      <h3 className='header-text'>Save Bookmark</h3>
      <button className='header__close-btn' type='button' onClick={onClose}>
        <AiOutlineClose size={14} />
      </button>
    </span>
    <form className='frm-panel' data-id={domId} onSubmit={saveBookmark}>
      <input type='text' className='txt__bookmark-name' placeholder='Bookmark Name' />
    </form>
    <div className='element-description'>
      <label className='lbl-element'>{domType}</label>
      <label className='lbl-classes'>{elClassNames}</label>      
    </div>
  </div>
);

export default AddBookmarkPanel;
