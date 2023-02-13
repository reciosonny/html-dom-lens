import React from "react";
import EditButton from "../../Elements/buttons/EditButton";
import DeleteButton from "../../Elements/buttons/DeleteButton";

const BookmarkItemList = ({ data, index, onEdit, onRemove, onHover }) => {
  const [displayInput, setDisplayInput] = React.useState(true)
  const [txtInput, setTxtInput] = React.useState("")

  const onClickEdit = () => {
    setDisplayInput(false)
  } 

  const onSubmitBookmark = (e) => {     
    onEdit(e, txtInput, data.id);
    setDisplayInput(true)
    e.preventDefault();
  }

  const test = () => {
    alert('test')
  }

  return (
    <div className="flex-row widget-list"  data-bookmark-id={data.id} onMouseOver={onHover}>
      <div className='flex-column '>
        {displayInput ? <div className=" widget-items">{data.title}</div> :
          <form onSubmit={onSubmitBookmark}>
            <input
              onChange={(e) => setTxtInput(e.target.value)}
              type="text"
              value={txtInput}
              className="flex-row"
              autoFocus
            />
        </form>}
        <div className='flex-row'>
          <label className='flex-row widget-details' style={{fontWeight: '600'}}>{data.elem}</label>
          <label className='flex-row widget-details' style={{fontWeight: '300'}}>{data.classes}</label>
        </div>
      </div>
      <div>
        <EditButton dataID={data.id}  onClickEdit={onClickEdit}/>
        <DeleteButton dataID={data.id} onClickDelete={onRemove}/>
      </div>
    </div>
  );
};

export default BookmarkItemList;
