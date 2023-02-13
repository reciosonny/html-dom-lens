import React from 'react'

const OptionsButton = ({children = React.FC, onClick}) => {
  return (
    <button style={{ fontSize: "20px" }} onClick={onClick}>
      {children}
    </button>
  )
}

export default OptionsButton