import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

const BookmarkInfo = ({ bookmarkHidden, onCloseBookmark, onEdit, onRemove, bookmarks, onClickBookmarkList }) => (  
  <React.Fragment>
    <div className='card-bookmark' hidden={bookmarkHidden}>
      <span className='bookmark-header'>
        <label className='header-text'>Bookmarks from this page</label>
        <button id='btnClose' className='header__close-btn' type='button' onClick={onCloseBookmark}>
          <AiOutlineClose size={14} color="#263238" />
        </button>
      </span>
      <div className='bookmark-body'>
        <BookmarkList
          onClickBookmarkList={onClickBookmarkList}
          bookmarks={bookmarks}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      </div>
      <div className='bookmark-footer'>
        <a>View bookmarks from all pages</a>
      </div>
    </div>
  </React.Fragment>
);

const BookmarkItem = ({ data, index, onRemove, onClickBookmarkList, onEdit }) => {
  const [displayInput, setDisplayInput] = useState(true);
  const [txtInput, setTxtInput] = useState("");

  const onSubmitBookmark = (e) => {    
    onEdit(e, txtInput, data.id);
    setDisplayInput(true)
  }

  const onClickEdit = () => {
    setDisplayInput(false)
  } 

  return (
    <li className='bookmark__list-item' key={index} data-bookmark-id={data.id} onClick={onClickBookmarkList}>
      <div className='list__item-details' >
      {displayInput ? 
          <label className="lbl-title">{data.title}</label> : 
          <form className="frm-panel"  onSubmit={onSubmitBookmark}>
            <input
              onChange={(e) => setTxtInput(e.target.value)}
              type="text"
              value={txtInput}          
              className="txt-title"
              autoFocus
            />
          </form>
        }
        <label className='lbl-elem'>{data.elem}</label>
        <label className='lbl-classes' style={{ fontSize: "12px" }}>
          {data.classes}
        </label>
      </div>
      <span className='list__item-options'>
        <button>
          <RiPencilFill data-bookmark-id={data.id} onClick={onClickEdit} color="#607D8B"/>
        </button>
        <button data-bookmark-id={data.id} onClick={onRemove}>
          <FaTrash  color="#607D8B"/>
        </button>
      </span>
    </li>
  );
};

const BookmarkList = ({ bookmarks, onEdit, onRemove, onClickBookmarkList }) => (
  <ul style={{ padding: "0px" }}>
    {bookmarks.map((data, index) => (
      <BookmarkItem
        data={data}
        index={index}
        onEdit={onEdit}
        onRemove={onRemove}
        onClickBookmarkList={onClickBookmarkList}
      />
    ))}
  </ul>
);

export default BookmarkInfo;
