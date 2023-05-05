import React from 'react'
import { FaTrash } from 'react-icons/fa';

const DeleteButton = ({ onClickDelete, dataID = "" }) => {
  return (
    <button  data-id={dataID} onClick={onClickDelete}>
      <FaTrash color="#607D8B"/>
    </button>
  )
}

export default DeleteButton