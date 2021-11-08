
import React, { useEffect, useState } from 'react';
import { BsFillBookmarkFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'
import '../../styles/bookmarkpanel.scss'
import { isEmpty } from 'lodash';

const BookmarkInfo = ({ bookmarkHidden, onCloseBookmark, onEdit, onRemove, bookmarks }) => (
    <React.Fragment>
        <div className='card-bookmark' hidden={bookmarkHidden}>
            <span className="bookmark-header">
                <label className='header-text'>Bookmarks from this page</label>
                <button id='btnClose' className='header__close-btn' type='button' onClick={onCloseBookmark}>
                    <AiOutlineClose size={14} />
                </button>
            </span>
            <div className='bookmark-body'>
                <BookmarkList bookmarks={bookmarks} onEdit={onEdit} onRemove={onRemove} />
            </div>
        </div>
    </React.Fragment>
)

const BookmarkList = ({ bookmarks, onEdit, onRemove }) => (
    <ul>
        {bookmarks.map((data, index) => (
            <li className='bookmark__list-item' key={index}>
                <div>
                    <h3>{data.title}</h3>
                    {/* <form onSubmit={onEdit} className='edit__txt-title'>
                        <input type='text' data-element-id={data.id} value={data.title} style={{display: 'block'}}/>
                    </form> */}
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

const AddBookmarkPanel = ({ domType, elClassNames, saveBookmark, show, onCloseOption, x, y }) => (
    <div className='add__bookmark-panel' hidden={!show} style={{ top: y+270, left: x+15}} >
        <span className='header'>
            <h3 className='header-text'>Save Bookmark</h3>
            <button className='header__close-btn' type='button' onClick={onCloseOption}>
                <AiOutlineClose size={14} />
            </button>
        </span>
        <form className='frm-panel' onSubmit={saveBookmark}>
            <input type='text' className='txt__bookmark-name' placeholder='Bookmark Name' />
        </form>
        <div className='element-description'>
            <label className='lbl-element'>{domType}</label>
            <label className='lbl-classes'>
                { elClassNames }
            </label>
        </div>
    </div>
)

const BookmarkPanel = ({elClassNames, domType, showAddBookmarkPanel, onCloseOption, x, y}) => {
    const [bookmarkHidden, setBookmarkHidden] = useState(true);
    const [btnBookmarkHidden, setBtnBookmarkHidden] = useState(true);
    const [addBookmarkPanelVisible, setAddBookmarkPanelVisible] = useState(false)
    const [bookmarks, setBookmarks] = useState([]);

    const onOpenBookmark = (e) => {
        setBookmarkHidden(false);
        setBtnBookmarkHidden(true);
    }

    const onCloseBookmark = (e) => {
        setBookmarkHidden(true);
        setBtnBookmarkHidden(false);
    }

    const onRemoveBookmark = (e) => {
        let currentBookmark = JSON.parse(localStorage.getItem('bookmarks'));
        const selectedBookmarkIdx = currentBookmark.findIndex(data => data.id === e.currentTarget.getAttribute('data-bookmark-id'))
        
        if (selectedBookmarkIdx !== -1) {
            currentBookmark.splice(selectedBookmarkIdx, 1)
            setBookmarks(currentBookmark);
            localStorage.setItem('bookmarks',  JSON.stringify(currentBookmark))

            if (bookmarks.length === 0 || currentBookmark.length === 0) {
                setBookmarkHidden(true);
                setBtnBookmarkHidden(false);
                localStorage.removeItem('bookmarks')
            }
        }
    }

    // const onEditBookmark = (e) => {
    //     e.preventDefault();

    //     const txtVal = e.target.querySelector('input');
    //     let currentBookmark = JSON.parse(localStorage.getItem('bookmarks'));
    //     const selectedBookmarkIdx = currentBookmark.findIndex(data => data.id === e.currentTarget.getAttribute('data-bookmark-id'))

    //     if(selectedBookmarkIdx !== -1) {
    //         currentBookmark[selectedBookmarkIdx].title = txtVal;
    //         setBookmarks(currentBookmark);
    //         localStorage.setItem(currentBookmark)
    //     }
    // }

    const saveBookmark = async (e) => {
        e.preventDefault();
        const element = e.target.parentElement.querySelector('.lbl-element').innerText;
        const classes = e.target.parentElement.querySelector('.lbl-classes').innerText;
        const uuidv4 = require("uuid/v4");
        let txtVal = e.target.querySelector('input').value;
        let savedBookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
        let bookmarkObj = {
            id: uuidv4(),
            title: txtVal,
            elem: element,
            classes
        }

        if (!isEmpty(txtVal)) {
            bookmarkObj.title = txtVal;
        } else {
            bookmarkObj.title = element + classes;
        }

        savedBookmarks.push(bookmarkObj);
        await setBookmarks(oldBookmarks => [...oldBookmarks, savedBookmarks]);
        localStorage.setItem('bookmarks', JSON.stringify(savedBookmarks));
        e.target.querySelector('input').value = '';
    }

    const onCloseAddBookmarkPanel = (e) => {
        setAddBookmarkPanelVisible(false)
    }

    useEffect(() => {
        let savedBookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
        setBookmarks(savedBookmarks);
        
        if (savedBookmarks.length !== 0 && bookmarkHidden) {
            setBtnBookmarkHidden(false);
            setBookmarkHidden(true)
        } else {
            setBtnBookmarkHidden(true)
        }
    }, [bookmarks.length])

    return (
        <div class='bookmark-panel'>
            <AddBookmarkPanel
                domType={domType}
                elClassNames={elClassNames}
                saveBookmark={saveBookmark}
                onClose={onCloseAddBookmarkPanel}
                show={showAddBookmarkPanel}
                onCloseOption={onCloseOption}
                x={x}
                y={y}
            />
            <BookmarkInfo
                bookmarkHidden={bookmarkHidden}
                onCloseBookmark={onCloseBookmark}
                bookmarks={bookmarks}
                show={addBookmarkPanelVisible}
                onRemove={onRemoveBookmark}
                // onEdit={onEditBookmark}
            />
            <button className='bookmark-btn' onClick={onOpenBookmark} hidden={btnBookmarkHidden}>
                <BsFillBookmarkFill />
                &nbsp;
                Bookmarks
            </button>
        </div>
    )
}

export default BookmarkPanel
