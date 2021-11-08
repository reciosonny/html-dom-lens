import React, { useEffect, useState } from 'react'
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'
import '../../styles/domoptions.scss'

function DomOptions({onClickOption, showAddBookmarkPanel}) {
    return (
        <div className='dom-options' >
            <button style={{ fontSize: '20px' }} onClick={onClickOption}>
                { showAddBookmarkPanel ? <BsFillBookmarkFill color='#673ab7'/> : <BsBookmark color="#673ab7" /> }
            </button>
            <button style={{ fontSize: '20px' }}>
                a
            </button>
            <button style={{ fontSize: '20px' }}>
                a
            </button>
        </div>
    )
}

export default DomOptions
