import React from 'react'

const SelectedDomFromBookmark = ({ selectedDom, ref }) => (
  <React.Fragment>
    <div id="" className="selected__dom-bookmark" ref={ref}>
      <span className="dom-info-domtype">{selectedDom.elem}</span>
      <span className="dom-info-lean--dom-id">
        {selectedDom.elId !== "" ? `#${selectedDom.elId}` : ""}
      </span>
      <span>{selectedDom.elClassNames}</span>
    </div>
  </React.Fragment>
);


export default SelectedDomFromBookmark
