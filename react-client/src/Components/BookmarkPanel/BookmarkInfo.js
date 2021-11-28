import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'


const BookmarkInfo = ({ bookmarkHidden, onCloseBookmark, onEdit, onRemove, bookmarks, onClickBookmarkList }) => (
  <React.Fragment>
      <div className='card-bookmark' hidden={bookmarkHidden}>
          <span className="bookmark-header">
              <label className='header-text'>Bookmarks from this page</label>
              <button id='btnClose' className='header__close-btn' type='button' onClick={onCloseBookmark}>
                  <AiOutlineClose size={14} />
              </button>
          </span>
          <div className='bookmark-body'>
              <BookmarkList onClickBookmarkList={onClickBookmarkList} bookmarks={bookmarks} onEdit={onEdit} onRemove={onRemove} />
          </div>
          <div className='bookmark-footer'>
              <a>View bookmarks from all pages</a>
          </div>
      </div>
  </React.Fragment>
);

const BookmarkList = ({ bookmarks, onEdit, onRemove, onClickBookmarkList }) => (
  <ul>
      {bookmarks.map((data, index) => (
          <li className='bookmark__list-item' key={index} data-bookmark-id={data.id} onClick={onClickBookmarkList}>
              <div className='list__item-details'>
                  <h3>{data.title}</h3>
                  <label className='lbl-elem'>{data.elem}</label>
                  <label className='lbl-classes' style={{ fontSize: '12px' }}>{data.classes}</label>
              </div>
              <span className='list__item-options'>
                  <button>
                      <RiPencilFill data-bookmark-id={data.id} onClick={onEdit} />
                  </button>
                  <button data-bookmark-id={data.id} onClick={onRemove}>
                      <FaTrash />
                  </button>
              </span>
          </li>
      ))}
  </ul>
)


export default BookmarkInfo
