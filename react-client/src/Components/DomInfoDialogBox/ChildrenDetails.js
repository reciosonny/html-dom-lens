import React from 'react'
import * as domUtils from "../../utils/domUtils";


const ChildrenDetails = ({ children, selectedChildIdx }) => {

  const [filteredChildren, setFilteredChildren] = React.useState([]);
  const [seeMoreChild, setSeeMoreChild] = React.useState(true);


  const numChildrenToDisplay = !seeMoreChild ? filteredChildren.length : 2;
  const leftover = filteredChildren.length - 2;

  const handleSeeMoreChild = () => {
    setSeeMoreChild(!seeMoreChild);
  };

  React.useEffect(() => {
    
    const filteredList = children.filter(clsname => clsname.id !== "#domInfoHighlight");

    setFilteredChildren(filteredList);    

    return () => {
      
    }
  }, [children]);

  const onChildClick = () => {
    const selectedEl = document.querySelector(`[data-dom-lens-target="true"]`);
    selectedChildIdx(selectedEl.id);
  }

  return (
    <div>
      <div className="dom-dialog">Children[{filteredChildren.length}]</div>
      <div className="dom-dialog-child-details">
        {filteredChildren.slice(0, numChildrenToDisplay).map((val, idx) => (              
          <div id={`${idx}`} className={val.updated && 'highlight-div'} onClick={onChildClick}>
            <div id={`${idx}`} className="dom-details-tag">{val.tag}</div>           
            {val.id}          
            {val.class && domUtils.childCLassFilter(val.class).replace(/  /g, ".").replace(/ /g, ".").replace(/,,/g, ".")  } 
            <br />
          </div>
        ))}
      </div>
      {filteredChildren.length > 2 && (            
        <div
          id="closeDom"
          className="see-more"
          onClick={handleSeeMoreChild}
        >                        
          {seeMoreChild  ? `... ${leftover} more` : `... see less`}
        </div>
      )}    
    </div>
  )
}

export default ChildrenDetails
