import React from 'react'

const ParentDetails = ({ tag, id, classes }) => (
  <React.Fragment>
    <div className="dom-dialog">Parent</div>
    <div className="dom-dialog-parent-details">
      <div className="dom-details-tag">{tag}</div>
      {id}
      {classes.map(val => `.${val}`)}
    </div>
  </React.Fragment>
)

export default ParentDetails
