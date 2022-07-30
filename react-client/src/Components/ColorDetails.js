import React from 'react'

const ColorDetails = ({ color }) => {

  return (
    <React.Fragment>
      <div
        className="display-dot"
        style={{
          background: color,
        }}
      ></div> {" "}
      <span style={{ color: '#455A64' }}>{color}</span>
    </React.Fragment>
  )
}
export default ColorDetails