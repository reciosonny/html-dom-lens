import React from 'react'

const ChildrenDetails = ({ children }) => {

  const [seeMoreChild, setSeeMoreChild] = React.useState(true);


  const numChildrenToDisplay = !seeMoreChild ? children.length : 2 ;
  const leftover = children.length - 3;

  const handleSeeMoreChild = () => {
    setSeeMoreChild(!seeMoreChild);
  };

  return (
    <div>
      <div className="dom-dialog">Children[{children.length-1}]</div>
      <div className="dom-dialog-child-details">
        {children.filter(clsname => clsname.id !== "#domInfoHighlight" ).slice(0, numChildrenToDisplay).map((val) => (              
          <div>
            <div className="dom-details-tag">{val.tag}</div>
            {val.id}
            {val.class && val.class.replace(/  /g, ".").replace(/ /g, ".")  }        
            <br />
          </div>
        ))}
      </div>
      {children.length - 1 > 2 && (            
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
