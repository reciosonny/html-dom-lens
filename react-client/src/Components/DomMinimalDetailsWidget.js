import React from 'react'

// This component is used to inject this into DOM element once we hover and display minimal details the DOM needs
const DomMinimalDetailsWidget = ({ ref, elId, elClassNames, domType, show }) => {
  const reducedClassNames = elClassNames.reduce((init, currVal) => {
    init += `.${currVal}`;

    return init;
  }, '');

  return (
    <React.Fragment>
      <div id='domInfoHighlight' className='dom-info-details-lean' ref={ref}>
        <span className='dom-info-lean--domtype'>{domType}</span><span className='dom-info-lean--dom-id'>{elId && `#${elId}`}</span><span>{reducedClassNames}</span>
      </div>

    </React.Fragment>
  )
}


export default DomMinimalDetailsWidget