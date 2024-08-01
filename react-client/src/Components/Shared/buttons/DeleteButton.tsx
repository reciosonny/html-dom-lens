import React from 'react'
import { FaTrash } from 'react-icons/fa';

interface Props {
  dataID?: string
  onClickDelete: () => void,
}

const DeleteButton = (props: Props) => {
  return (
    <button  data-id={props.dataID} onClick={() => props.onClickDelete()}>
      <FaTrash color="#607D8B"/>
    </button>
  )
}

export default DeleteButton