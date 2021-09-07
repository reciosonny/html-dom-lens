import React from 'react'

const DomSwitch = () => {
  return (
    <div id = "divDeveloperTools"
    style={{
      height: "50px",
      width: "150px",
      background: "white",
      color: "blue",
      fontWeight: "800 !important",
      zIndex: "999",
      border: "3px solid green",
      borderRadius: "20px",
      position: "fixed",
      // top: `${coordinates.top}px`,
      // left: `${coordinates.left}px`,
      top: `0px`,
      right: `0px`,
      cursor: "pointer"
    }}
  >
      <p>This is the switch </p>
</div>
  )
}

export default DomSwitch
