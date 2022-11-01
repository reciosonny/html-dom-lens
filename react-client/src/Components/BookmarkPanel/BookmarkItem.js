import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';



const BookmarkItem = ({ data, index, onRemove, onClick, onHover, onEdit }) => {
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
    <li className='bookmark__list-item' key={index} data-bookmark-id={data.id} onMouseOver={onHover} onClick={onClick}>
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
          <FaTrash color="#607D8B"/>
        </button>
      </span>
    </li>
  );
};



export default BookmarkItem