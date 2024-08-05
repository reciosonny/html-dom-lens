import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { DeleteButtonModel } from '../../../model/Shared';

const DeleteButton = ({ dataID, onClickDelete }: DeleteButtonModel) => {
  return (
    <button data-id={dataID} onClick={() => onClickDelete()}>
      <FaTrash color="#607D8B" />
    </button>
  )
}

export default DeleteButton