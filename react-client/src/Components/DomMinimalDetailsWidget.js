import React from 'react'
import * as domUtils from '../utils/domUtils'

// This component is used to inject this into DOM element once we hover and display minimal details the DOM needs
const DomMinimalDetailsWidget = React.forwardRef(({ elId, elClassNames, domType, positionX, positionY }, ref) => {


  const reducedClassNames = elClassNames.reduce((init, currVal) => {
    if (currVal) {
      init += `.${currVal}`;
    }

    return init;
  }, '');

  return (
    <div id='domInfoHighlight' className='dom-info-details-lean' style={{ top: positionY, left: positionX, width: 'fit-content' }} ref={ref}>
      <span className='dom-info-lean--domtype'>{domType}</span>
      <span className='dom-info-lean--dom-id'>{elId && `#${elId}`}</span>
      <span>{domUtils.customWidgetFilter(reducedClassNames)}</span>
    </div>
  )
});


export default DomMinimalDetailsWidget