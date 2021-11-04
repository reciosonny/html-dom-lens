
import React, { useEffect, useState } from 'react';
import { BsFillBookmarkFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'
import '../../styles/bookmarkpanel.scss'


const BookmarkInfo = ({ bookmarkVisible, onCloseBookmark }) => (
    <React.Fragment>
        <div className='card-bookmark' hidden={!bookmarkVisible}>
            <span className="bookmark-header">
                <label className='header-text'>Bookmarks from this page</label>
                <button id='btnClose' className='header__close-btn' type='button' onClick={onCloseBookmark}>
                    <AiOutlineClose size={14}/>
                </button>
            </span>
            <div className='bookmark-body'>
                <ul>
                    <BookmarkList />
                </ul>
            </div>
        </div>
    </React.Fragment>
)

const BookmarkList = ({ onCloseBookmark }) => (
    <li className='bookmark__list-item'>
        <div>
            <h3>Heading Bookmark</h3>
            <label style={{fontSize: '12px'}}>div.class</label>
        </div>
        <span className='list__item-options'>
            <button><RiPencilFill/></button>
            <button><FaTrash/></button>
        </span>
        
    </li>
)

const BookmarkPanel = (props) => {
    const [bookmarkVisible, setBookmarkVisible] = useState(false);
    const [btnBookmarkVisible, setBtnBookmarkVisible] = useState(true);
    const [bookmarks, setBookmarks] = useState([{}]);

    const onOpenBookmark = function(e) {
        setBookmarkVisible(true);
        setBtnBookmarkVisible(false);
    }  
    
    const onCloseBookmark = (e) => {
        setBookmarkVisible(false);
        setBtnBookmarkVisible(true);
    }  

    const onLoadedBookmark = function(e) {
        console.log(e)
    }
    
    

    useEffect(() => {
        document.getElementById('btnClose').addEventListener('click', onCloseBookmark);
        
        if(bookmarks.length !== 0) {
            setBtnBookmarkVisible(true);
        } else {
            setBtnBookmarkVisible(false)
        }
    }, [])  

    return (
        <div class='bookmark-panel'>
            <BookmarkInfo bookmarkVisible={bookmarkVisible} onCloseBookmark={onCloseBookmark} />
            <button className='bookmark-btn' onClick={onOpenBookmark} hidden={!btnBookmarkVisible}>
                <BsFillBookmarkFill/>
                &nbsp;
                Bookmarks
            </button> 
        </div>
    )
}

export default BookmarkPanel
