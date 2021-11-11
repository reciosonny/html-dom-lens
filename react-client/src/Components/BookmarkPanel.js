
import React, { useEffect, useState } from 'react';
import { BsFillBookmarkFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'
import '../../styles/bookmarkpanel.scss'
import { isEmpty } from 'lodash';

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
)

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

const AddBookmarkPanel = ({ domType, elClassNames, saveBookmark, show, onCloseOption, x, y, domId }) => (
    <div className='add__bookmark-panel' hidden={!show} style={{ top: y + 270, left: x + 15 }} >
        <span className='header'>
            <h3 className='header-text'>Save Bookmark</h3>
            <button className='header__close-btn' type='button' onClick={onCloseOption}>
                <AiOutlineClose size={14} />
            </button>
        </span>
        <form className='frm-panel' data-id={domId} onSubmit={saveBookmark} >
            <input type='text' className='txt__bookmark-name' placeholder='Bookmark Name' />
        </form>
        <div className='element-description'>
            <label className='lbl-element'>{domType}</label>
            <label className='lbl-classes'>
                {elClassNames}
            </label>
        </div>
    </div>
)

const BookmarkPanel = ({ elClassNames, domType, showAddBookmarkPanel, onCloseOption, x, y, domId, domTarget }) => {
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
            localStorage.setItem('bookmarks', JSON.stringify(currentBookmark))

            if (bookmarks.length === 0 || currentBookmark.length === 0) {
                setBookmarkHidden(true);
                setBtnBookmarkHidden(false);
                localStorage.removeItem('bookmarks')
            }
        }
    }

    const saveBookmark = async (e) => {
        e.preventDefault();
        const element = e.target.parentElement.querySelector('.lbl-element').innerText;
        const classes = e.target.parentElement.querySelector('.lbl-classes').innerText;
        let domIndex = 0;


        const domId = e.target.getAttribute('data-id');
        const uuidv4 = require("uuid/v4");
        let txtVal = e.target.querySelector('input').value;
        let savedBookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];

        document.querySelectorAll(classes).forEach((data, idx) => {
            if (data === domTarget) {
                domIndex = idx
            }
        })

        let bookmarkObj = {
            id: uuidv4(),
            domIndex,
            title: txtVal,
            elem: element,
            domId,
            classes,
            x,
            y
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

    const onClickBookmarkList = async (e) => {
        const selectedBookmark = bookmarks.filter(data => e.currentTarget.getAttribute('data-bookmark-id') === data.id);
        const domId = selectedBookmark[0].domId;
        const elem = selectedBookmark[0].elem
        const focusedDomLength = document.querySelectorAll('.focused-dom').length;
        const domIndex = selectedBookmark[0].domIndex;

        const selectedDom = document.querySelectorAll(selectedBookmark[0].classes)[domIndex]

        
        for(let i = 0; i < focusedDomLength; i++) {
            document.querySelectorAll('.focused-dom')[0].classList.remove('focused-dom');
        }

        selectedDom.classList.add('focused-dom')
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
                domId={domId}
            />
            <BookmarkInfo
                bookmarkHidden={bookmarkHidden}
                onCloseBookmark={onCloseBookmark}
                bookmarks={bookmarks}
                show={addBookmarkPanelVisible}
                onRemove={onRemoveBookmark}
                onClickBookmarkList={onClickBookmarkList}
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
