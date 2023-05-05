import React from 'react'
import { RiPencilFill } from 'react-icons/ri';

const EditButton = ({ onClickEdit, dataID = "" }) => {
  return (
    <button data-id={dataID} onClick={onClickEdit}>
      <RiPencilFill  color="#607D8B"/>
    </button>
  )
}

export default EditButton