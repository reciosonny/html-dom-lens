import React from 'react'

const ChildrenDetails = ({ children }) => {

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


  return (
    <div>
      <div className="dom-dialog">Children[{filteredChildren.length}]</div>
      <div className="dom-dialog-child-details">
        {filteredChildren.slice(0, numChildrenToDisplay).map((val) => (              
          <div className={val.updated && 'highlight-div'}>
            <div className="dom-details-tag">{val.tag}</div>           
            {val.id}          
            {val.class && val.class.replace(/  /g, ".").replace(/ /g, ".")  } 
            <br />
          </div>
        ))}
      </div>
      {filteredChildren.length > 2 && (            
        <div
          id="closedompeeker"
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
