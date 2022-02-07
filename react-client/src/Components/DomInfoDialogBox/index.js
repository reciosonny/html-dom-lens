import React, { useeffect, useState } from "react";
import DomOptions from "../DomOptions";
import ChildrenDetails from "./ChildrenDetails";
import ParentDetails from "./ParentDetails";

const FontColorDetails = ({ textcolor }) => {

  return (
    <React.Fragment>
      <div
        className="display-dot"
        style={{
          background: textcolor,
        }}
      ></div> {" "}
      <span style={{ color: '#455A64' }}>{textcolor}</span>
    </React.Fragment>
  )
}

let domObserver;
const DomInfoDialogBox = ({ id, idx, tag, classNames, parent, children, top, left, onClose, fontsize,
  fontfamily, textcolor, borderclr, uniqueID, dataAttributes, onClickFocus, domElement, focusMode, onClickBookmarkEmit, hasExistingBookmark }) => {

  const [domInfo, setDomInfo] = useState({ tag: '', classNames: [], parent: '', children: [], fontsize: '',
    fontfamily: '', textcolor: '', borderclr: '', uniqueID: '', dataAttributes: '', domElement: '' });

  const [seemoreAttr, setseemoreAttr] = useState(true);
  const [showAddBookmarkPanel, setShowAddBookmarkPanel] = useState(false);


  const handleSeeMoreAttr = () => {   
    setseemoreAttr(!seemoreAttr);
  };

  const initializeDomObserver = async () => {

    const targetNode = domElement;

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationsList, observer) => {

        for(const mutation of mutationsList) {
          if (mutation.type === 'childList') {
              
            if (domElement !== mutation.target) return;

            const newChildren = [...mutation.target.children].map((child) => {

              // If it doesn't exist in existing children the first time dialogbox shows up, then it's a new child
              const updated = !children.some(val => val.element === child);

              return {
                id: child.id ? "#" + child.id : null,
                class: child.className ? "." + child.className : null,
                tag: child.localName,
                updated
              };
            });

            window.store.DomInfoDialogBox.children = newChildren; //need to put it inside window.store so it gets the updated children (see mutation type attributes)

            setDomInfo({ ...domInfo, classNames: window.store.DomInfoDialogBox.classList, children: newChildren });
          }
          else if (mutation.type === 'attributes') {

            switch (mutation.attributeName) {
              case 'class':
                if (domElement === mutation.target) {
                  const newClassList = [...mutation.target.classList].map(name => {
                    const updated = !classNames.some(existingClass => existingClass.slice(1) === name); //slice/remove the dot(.)
                    return {
                      name: `.${name}`, 
                      updated
                    }
                  });

                  window.store.DomInfoDialogBox.classList = newClassList; //store inside window for later retrieval
  
                  setDomInfo({ ...domInfo, children: window.store.DomInfoDialogBox.children, classNames: newClassList }); //need to call window.store.children here for updated data
                }

                break;
            }

          }
        }
    };

    domObserver = new MutationObserver(callback);
    domObserver.observe(targetNode, config);
  }

  const numAttibToDisplay = !seemoreAttr ? dataAttributes.length : 2 ;
  const attrleftover = dataAttributes.length - 2;

  React.useEffect(() => {
    
    initializeDomObserver();

    const classNamesWithStatus = classNames.map(name => ({ name, updated: false, removed: false }));
    const childrenWithStatus = children.map(child => ({ ...child, updated: false, removed: false }));

    window.store.DomInfoDialogBox.children = childrenWithStatus;


    setDomInfo({ ...domInfo, tag, classNames: classNamesWithStatus, parent, children: childrenWithStatus, fontsize, fontfamily, textcolor, borderclr, uniqueID, dataAttributes, domElement }) //set DOM info here...

    return () => {
      domObserver.disconnect();
    }
  }, []);

  React.useEffect(() => {
    // if the DOM has existing bookmark, enable it by default.
    setShowAddBookmarkPanel(hasExistingBookmark);

    return () => {
      
    }
  }, [hasExistingBookmark]);

  return (
    <React.Fragment>
      <div
        className="dom-info-dialog-box"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          border: `3px solid ${borderclr}`,
        }}
      >        
        <button id="closedompeeker" className="close-btn-style" onClick={() => onClose(idx, id, uniqueID)}>
          x
        </button>
       
        <div>
          <div className="dom-header">
            <span className="dom-header-tag">{tag}</span>
            {id && <span className="dom-header-details">{id}</span>}           
            {domInfo.classNames.filter(obj => obj.name !== ".focused-dom"  && !obj.name.includes("c00")).map((val) => (              
              <span className={`dom-header-details ${val.updated ? 'highlight-div' : ''}`}>{val.name}</span>
            ))}
          </div>
          <div className="flex-row">
            <div className="flex-column">
              <div className="dom-styles-details"> {fontsize}</div>
              <div className="dom-styles">Size</div>
            </div>
            <div className="flex-column">
              <div className="dom-styles-details">
                <FontColorDetails textcolor={textcolor} />
              </div>
              <div className="dom-styles">Color</div>
            </div>
          </div>
          <div className="dom-styles-details">{fontfamily}</div>
          <div className="dom-styles">Font Family</div>
          
          <ParentDetails 
            tag={parent.tag}
            id={parent.id}
            classes={parent.classes}
          />

          <div className="dom-dialog">data-* attributes </div>             
          <div className="dom-dialog-child-details">   
            {dataAttributes.slice(0, numAttibToDisplay).map((val) => (
              <div className="attributecontainer">              
                <div className="attributeitems">                 
                  {val.key}                
                </div>
                <div className="attributeitems">
                  {val.value}
                </div>
              </div>
            ))}                             
          </div>

          {dataAttributes.length > 2 &&(            
            <div
              id="closedompeeker"
              className="see-more"
              onClick={handleSeeMoreAttr}
            >
              {seemoreAttr  ? `... ${attrleftover} more` : `... see less`}
            </div>
          )}

          <ChildrenDetails children={domInfo.children} />
        </div>

        <DomOptions 
          focusMode={focusMode} 
          onClickFocus={() => onClickFocus(domElement)} 
          onClickBookmark={onClickBookmarkEmit} 
          showAddBookmarkPanel={showAddBookmarkPanel} 
        />

      </div>
    </React.Fragment>
  );
};

export default DomInfoDialogBox;
