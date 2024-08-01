import React from 'react'

interface Props {
  children: any
  onClick: () => void,
}

const OptionsButton = (props: Props) => {
  return (
    <button style={{ fontSize: "20px" }} onClick={() => props.onClick()}>
      {props.children}
    </button>
  )
}

export default OptionsButton