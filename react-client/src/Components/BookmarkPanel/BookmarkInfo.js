import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

const BookmarkInfo = ({ bookmarkHidden, onCloseBookmark, onEdit, onRemove, bookmarks, onClickBookmarkList }) => (
  <React.Fragment>
    <div className='card-bookmark' hidden={bookmarkHidden}>
      <span className='bookmark-header'>
        <label className='header-text'>Bookmarks from this page</label>
        <button id='btnClose' className='header__close-btn' type='button' onClick={onCloseBookmark}>
          <AiOutlineClose size={14} />
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

const BookmarkItem = ({ data, index, onRemove, onClickBookmarkList }) => {

  const onEdit = () => {
    alert('editing a bookmark details');
  }

  // const onRemove = () => {
    
  // }

  return (
    <li className='bookmark__list-item' key={index} data-bookmark-id={data.id} onClick={onClickBookmarkList}>      
      <div className="list__item-details">        
        <label className='item-title'>{data.title}</label>             
        <label className="lbl-elem">{data.elem}</label>
        <label className="lbl-classes" style={{ fontSize: "12px" }}>
          {data.classes}
        </label>
      </div>
      <span className="list__item-options">
        <button>
          <RiPencilFill data-bookmark-id={data.id} onClick={onEdit} color="#607D8B"/>
        </button>
        <button data-bookmark-id={data.id} onClick={onRemove}>
          <FaTrash color="#607D8B"/>
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
