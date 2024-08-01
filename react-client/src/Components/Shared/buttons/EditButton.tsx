import React from 'react'
import { RiPencilFill } from 'react-icons/ri';

interface Props {
  dataID?: string
  onClickEdit: () => void,
}

const EditButton = (props: Props) => {
  return (
    <button data-id={props.dataID} onClick={() => props.onClickEdit()}>
      <RiPencilFill color="#607D8B" />
    </button>
  )
}

export default EditButton