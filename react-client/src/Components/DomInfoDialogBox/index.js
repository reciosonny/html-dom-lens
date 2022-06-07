import React, { useEffect, useState, useContext, useRef } from "react";
import DomOptions from "../DomOptions";
import ChildrenDetails from "./ChildrenDetails";
import ParentDetails from "./ParentDetails";
import * as domUtils from "../../utils/domUtils";
import AddBookmarkPanel from "../BookmarkPanel/AddBookmarkPanel";
import AddAnnotationPanel from "../AnnotationPanel/AddAnnotationPanel";
import useLocalStorageStore from "../../hooks/useLocalStorageStore";
import useDraggable from "../../hooks/useDraggable";
import FocusedTargetedElement from "../FocusedTargetedElement";


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


let domObserver;
const DomInfoDialogBox = ({ elementId, idx, tag, classNames, classNamesString, parent, children, top, left, onClose, fontsize, fontfamily, textcolor, backgroundColor, borderclr, uniqueID, dataAttributes, domElement, focusedState, hasExistingBookmark, hasExistingAnnotations, onRemoveBookmarkEmit, onHover }) => {

  const [domInfo, setDomInfo] = useState({ tag: '', classNames: [], parent: '', children: [], fontsize: '', fontfamily: '', textcolor: '', borderclr: '', uniqueID: '', dataAttributes: '', domElement: '' });
  const [seeMoreAttr, setSeeMoreAttr] = useState(true);
  const [focusMode, setFocusMode] = useState(false);  


  const [showAddBookmarkPanel, setShowAddBookmarkPanel] = useState(false);
  const [stateHasExistingBookmark, setStateHasExistingBookmark] = useState(false);
  const [stateHasExistingAnnotation, setStateHasExistingAnnotation] = useState(false);
  const [showAddAnnotationsPanel, setShowAddAnnotationsPanel] = useState(false);

  const [bookmarksStore, setBookmarksStore, updateBookmarksStore] = useLocalStorageStore('bookmarks', []);
  const [annotationStore, setAnnotationStore, getAnnotationStoreUpdates] = useLocalStorageStore('annotation', []);

  const [focusedTargetedElementStyles, setFocusedTargetedElementStyles] = useState({ leftPosition: '', topPosition: '', height: '', width: '', opacity: 0 });

  const handleSeeMoreAttr = () => {   
    setSeeMoreAttr(!seeMoreAttr);
  };


const initializeDomObserver = async () => {
  const targetNode = domElement
  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };
  // Callback function to execute when mutations are observed
  const callback = (mutationsList, observer) => {      
    for(const mutation of mutationsList) {                   
      if (domElement === mutation.target) {
          const newClassList = [...mutation.target.classList].map(name => {
            const updated = !classNames.some(existingClass => existingClass.slice(1) === name); //slice/remove the dot(.)
            return {
              name: `.${name}`, 
              updated
            }
          }).filter(
            (obj) => obj.name !== '.focused-dom' && obj.name !== '.focused-element' && !obj.name.includes('custom-css')
          );            
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
          setDomInfo({ ...domInfo, children: newChildren, classNames: newClassList }); //need to call window.store.children here for updated data
      }      
    }
  };

  domObserver = new MutationObserver(callback);
  domObserver.observe(targetNode, config);
}  
  
  const numAttibToDisplay = !seeMoreAttr ? dataAttributes.length : 2 ;
  const attrleftover = dataAttributes.length - 2;

  React.useEffect(() => {
    const classNamesWithStatus = classNames.map(name => ({ name, updated: false, removed: false }));
    const childrenWithStatus = children.map(child => ({ ...child, updated: false, removed: false }));

    window.store.DomInfoDialogBox.children = childrenWithStatus;
    window.store.DomInfoDialogBox.classList = classNamesWithStatus;

    setDomInfo({ ...domInfo, tag, classNames:  classNamesWithStatus, parent, children: childrenWithStatus, fontsize, fontfamily, textcolor, borderclr, uniqueID, dataAttributes, domElement }) //set DOM info here...
    initializeDomObserver();

    return () => {
      domObserver.disconnect();
    }
  }, [classNames,children]);

  React.useEffect(() => {
    // if the DOM has existing bookmark, enable it by default.
    setStateHasExistingBookmark(hasExistingBookmark);
    return () => {
    }
  }, [hasExistingBookmark]);

  React.useEffect(() => {
    setStateHasExistingAnnotation(hasExistingAnnotations);
    return () => {      
    }
  }, [hasExistingAnnotations]);  
  
  const removeExistingBookmark = () => {
    const domIdentifier = domUtils.getUniqueElementIdentifierByTagAndIndex(domElement);
    const duplicateIndex =  bookmarksStore.findIndex((obj) => obj.domIndex === domIdentifier.index && obj.elem === domIdentifier.elType);    
    const filteredBookmark =  bookmarksStore.filter((value,idx) => idx !== duplicateIndex);
    setBookmarksStore(filteredBookmark);
    setShowAddBookmarkPanel(false);
    onRemoveBookmarkEmit();
  }
  
  const onClickAddBookmark = () => {   
    stateHasExistingBookmark ? removeExistingBookmark() : setShowAddBookmarkPanel(!showAddBookmarkPanel);    
    setStateHasExistingBookmark(!stateHasExistingBookmark) 
    setShowAddAnnotationsPanel(false);
  };

  const onClickAddAnnotation = () => {         
    !stateHasExistingAnnotation ? setStateHasExistingAnnotation(!stateHasExistingAnnotation) :  setStateHasExistingAnnotation(domUtils.hasAnnotations(annotationStore, domElement));   
    setShowAddAnnotationsPanel(!showAddAnnotationsPanel);
    setShowAddBookmarkPanel(false);  
  };

  const onRemoveAnnotation = () => {
    getAnnotationStoreUpdates(); 
    setStateHasExistingAnnotation(false);
    setShowAddAnnotationsPanel(false);
  }

  const onUpdatedAnnotation = () => {    
    getAnnotationStoreUpdates(); 
    setStateHasExistingAnnotation(true);
  }

  const onClickCloseDialogBox = () => {    
    const focusedEl = document.querySelectorAll(".focused-element");    
    if ( focusedEl.length > 0 && domElement !== focusedEl[0] ) return;
    
    domElement.classList.remove(domElement.className.split(' ').filter(cls => cls.includes('custom-css')).toString());
    domElement.classList.remove("focused-element");
    setFocusMode(false)

    setFocusedTargetedElementStyles({ 
      ...focusedTargetedElementStyles,
      leftPosition: `0px`, 
      topPosition: `0px`,
      height: `0px`,
      width: `0px`,
      opacity: 0
    });
    onClose(idx, elementId, uniqueID);
  }

  const onClickFocus = (elTarget) => {
    const existingFocus = document.getElementsByClassName("focused-element");
    const cutoutTarget = document.querySelector(".focused-targeted-element");

    if (existingFocus[0] === elTarget) {      
      existingFocus[0].classList.remove("focused-element");

      setFocusedTargetedElementStyles({ ...focusedTargetedElementStyles, opacity: 0 });

      focusedState(false);
      setFocusMode(false);
    } else {
      if (existingFocus.length === 0) {
        updateFocusedTargetedElementStyles(elTarget, cutoutTarget);
    
        focusedState(true);
      }
    }
  }

  const updateFocusedTargetedElementStyles = (elTarget) => {
    setFocusMode(!focusMode);
    
    const elProperties = elTarget.getBoundingClientRect();

    setFocusedTargetedElementStyles({ 
      ...focusedTargetedElementStyles,
      leftPosition: `${elProperties.x + window.scrollX}px`, 
      topPosition: `${elProperties.y + window.scrollY}px`,
      height: `${elProperties.height}px`,
      width: `${elProperties.width}px`,
      opacity: 1
    });
    elTarget.classList.toggle("focused-element");
  }

  const dragRef = useRef(null);
  useDraggable(dragRef);
  
  return (
    <React.Fragment>
      <FocusedTargetedElement {...focusedTargetedElementStyles} />
      <div
        className="dom-info-dialog-box"
        onMouseEnter={onHover}
        style={{
          top: `${top}px`,
          left: `${left}px`,
          border: `3px solid ${borderclr}`,
        }}
        ref = {dragRef}
      >
        {/* <button id="closeDom" className="close-btn-style" onClick={() => onClose(idx, elementId, uniqueID)}> */}
        <button id="closeDom" className="close-btn-style" onClick={onClickCloseDialogBox}>
          x
        </button>

        <DomOptions 
          focusMode={focusMode} 
          onClickFocus={() => onClickFocus(domElement)} 
          onClickBookmark={onClickAddBookmark} 
          onClickAnnotation={onClickAddAnnotation}
          showAddBookmarkIcon={stateHasExistingBookmark} 
          showAddAnnotationIcon={stateHasExistingAnnotation} 
        />          
        <div>
          <div className="dom-header">           
            <span className="dom-header-tag">{tag}</span>
            {elementId && <span className="dom-header-details">{elementId}</span>}                                     
              {domInfo.classNames.map((val) => (  
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
                <ColorDetails color={textcolor} />
              </div>
              <div className="dom-styles">Text-Color</div>
            </div>
            <div className="flex-column">
              <div className="dom-styles-details">
                <ColorDetails color={backgroundColor} />
              </div>
              <div className="dom-styles">Background-Color</div>
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
              id="closeDom"
              className="see-more"
              onClick={handleSeeMoreAttr}
            >
              {seeMoreAttr  ? `... ${attrleftover} more` : `... see less`}
            </div>
          )}
          <ChildrenDetails children={domInfo.children} />         
        </div>       
        {showAddBookmarkPanel && 
          <AddBookmarkPanel 
            domType={tag}
            elClassNames={classNamesString}
            domId={uniqueID}
            elementId={elementId}
            onSaveBookmark={() => setShowAddBookmarkPanel(false)}
            onClose={() => setShowAddBookmarkPanel(false)}  
            targetElement={domElement} 
          />
        }
        {showAddAnnotationsPanel && 
          <AddAnnotationPanel 
            onRemoveAnnotation={onRemoveAnnotation} 
            targetElement={domElement} 
            onUpdatedAnnotation={onUpdatedAnnotation}
          />
        }

      </div>
    </React.Fragment>
  );
};

export default DomInfoDialogBox;
