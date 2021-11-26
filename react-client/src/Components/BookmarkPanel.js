
import React, { useEffect, useRef, useState } from 'react';
import { BsFillBookmarkFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'
import '../../styles/bookmarkpanel.scss'
import { forEach, isEmpty, uniq } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import DomMinimalDetailsWidget from './DomMinimalDetailsWidget';

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

const SelectedDomFromBookmark = ({selectedDom, ref}) => (
    <React.Fragment>
      <div id='' className='selected__dom-bookmark' ref={ref}>
        <span className='dom-info-domtype'>{selectedDom.elem}</span><span className='dom-info-lean--dom-id'>{selectedDom.elId !== '' ? `#${selectedDom.elId}`: ''}</span><span>{selectedDom.elClassNames}</span>
      </div>
    </React.Fragment>
)

const BookmarkPanel = ({ elClassNames, domType,showAddBookmarkPanel, setShowAddBookmarkPanel, onCloseOption, x, y, domId, domTarget }) => {
    
    const [bookmarkHidden, setBookmarkHidden] = useState(true);
    const [btnBookmarkHidden, setBtnBookmarkHidden] = useState(true);
    const [addBookmarkPanelVisible, setAddBookmarkPanelVisible] = useState(false)
    const [bookmarks, setBookmarks] = useState([]);
    const [retrievedEl, setRetrievedEl] = useState({});
    const refSelectedDom = React.useRef(null)

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
        let dom = [...document.querySelectorAll(domTarget.tagName.toLowerCase())].reduce((acc, dom, idx) => {
            if (dom === domTarget) {
                acc.elType = dom.tagName.toLowerCase();
                acc.index = idx;
            }

            return acc;
        }, { elType: '', index: 0 });

        const element = e.target.parentElement.querySelector('.lbl-element').innerText;
        const classes = e.target.parentElement.querySelector('.lbl-classes').innerText;
        const elId = domTarget.id;
        const randomCode = uuidv4();


        let txtVal = e.target.querySelector('input').value;
        let savedBookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
        let bookmarkObj = {
            id: randomCode,
            title: txtVal,
            elem: dom.elType,
            elId,
            classes,
            domIndex: dom.index,
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

        setShowAddBookmarkPanel(false);
    }

    const onCloseAddBookmarkPanel = (e) => {
        setAddBookmarkPanelVisible(false)
    }

    const onClickBookmarkList = async (e) => {
        const selectedBookmark = bookmarks.find(data => e.currentTarget.getAttribute('data-bookmark-id') === data.id);
        const focusedDomLength = document.querySelectorAll('.selected-dom').length;
        var elType = selectedBookmark.elem;
        const retrievedElement = [...document.querySelectorAll(elType)].find((dom, idx) => idx === selectedBookmark.domIndex);
        
        for (let i = 0; i < focusedDomLength; i++) {
            document.querySelectorAll('.selected-dom')[i].classList.remove('selected-dom');
        }

        await setRetrievedEl({
            elClassNames: selectedBookmark.classes,
            elem: selectedBookmark.elem,
            elId: selectedBookmark.elId
        })

        retrievedElement.classList.add('selected-dom')
        retrievedElement.scrollIntoView({ block: 'center' })
        retrievedElement.appendChild(refSelectedDom.current.base);
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

            <SelectedDomFromBookmark 
                ref={refSelectedDom}
                selectedDom={retrievedEl}
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
