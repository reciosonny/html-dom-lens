import React, { Component, useEffect, useState, useContext } from "react";
import { hot } from "react-hot-loader";
import jss from 'jss';


import DomInfoDialogBox from "./DomInfoDialogBox";
import { PRODUCTION_MODE } from "../keys";
import DomMinimalDetailsWidget from "./DomMinimalDetailsWidget";
import DomSwitch from "./DomSwitch";
import {forEach} from 'lodash'

import * as domUtils from "../utils/domUtils";
import BookmarkPanel from "./BookmarkPanel";
import * as chromeExtensionUtils from "../utils/chromeExtensionUtils";

import useLocalStorageStore from "../hooks/useLocalStorageStore";
import GlobalContext from "../store/global-context";

window.store = {
  focusMode: false,
  switchExtensionFunctionality: true,
  bookmarkBtnClicked: false, //we can use this to set a guard to `onClick` event we wired up using plain javascript to prevent those logic from getting mixed up
  DomInfoDialogBox: {
    children: [],
    classList: []
  }
};

function App() {
  const [domInfo, setDomInfo] = useState([]);
  const [domLeanDetails, setDomLeanDetails] = useState({ elId: "", elClassNames: [], domType: "" });

  // TODO: Use this once we're done with fixing bookmarks feature...
  const [stateConfigOptions, setStateConfigOptions] = useState({ showAddBookmarkPanel: false, focusMode: false, addBookmarkModeEnabled: false });

  const [selectedAddBookmarkDomElIdx, setSelectedAddBookmarkDomElIdx] = useState(null);
  const [showAddBookmarkPanel, setShowAddBookmarkPanel] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  // If this is enabled, disable events like mouse hover. If user clicks outside of add bookmark component, then set `add bookmark mode` to false.
  
  const [selectedElem, setSelectedElem] = useState({});
  const [switchExtensionFunctionality, setExtensionFunctionality] = useState(true);

  const [bookmarksStore, setBookmarksStore, updateBookmarksStore] = useLocalStorageStore('bookmarks', []);
  const [annotationStore, setAnnotationStore] = useLocalStorageStore('annotation', []);
  const [stateBookmarks, setStateBookmarks] = useState([]);


  const onTurnOffExtension = () => {

    // removes border highlights added in DOM elements when it's clicked
    domInfo.forEach(val => {
      const currEl = document.querySelector(`[data-id="${val.dataId}"]`);

      if (!currEl) return;

      if (currEl.classList.contains(val.cssClassesAssigned)) {
        currEl.classList.remove(val.cssClassesAssigned);
      }
    });

    setTimeout(() => {
      //remove left-over focused-dom highlights
      [...document.querySelectorAll('.focused-dom')].forEach(el => el.classList.remove('focused-dom'));
    }, 300);

    setDomInfo([]); //if DOM extension is turned off, empty the DOM info state array
    setExtensionFunctionality(false);
  };
  const refDomHighlight = React.useRef(null);


  //#region Effects hook

  React.useEffect(() => {
    if (!PRODUCTION_MODE) {
      /**
       * Note: swap the urls for testing different websites. Sample websites for testing:
       * https://web.archive.org/web/20131014212210/http://stackoverflow.com/
       */
      getPageContent('https://www.redfin.com/');
      // getPageContent(
      //   "https://web.archive.org/web/20131014212210/http://stackoverflow.com/"
      // );
      // getPageContent(
      //   "https://facebook.com"
      // );
    } else {
      injectDOMEventInBody();

      chromeExtensionUtils.onMessageEvent(function (msg, sender, sendResponse) {
        setExtensionFunctionality(true);

        if (msg.text === 'are_you_there_content_script?') {
          sendResponse({ status: "yes" });
        }
      });
    }

    return () => { };
  }, []);

  React.useEffect(() => {
    
    setStateBookmarks(bookmarksStore);
  
    return () => {
      
    }
  }, [bookmarksStore]);

  React.useEffect(() => {

    //dirty way to get the value from state since normal JS event handlers cannot communicate the state well with React
    window.store.switchExtensionFunctionality = switchExtensionFunctionality;

    return () => {

    }
  }, [switchExtensionFunctionality]);

  React.useEffect(() => {
    
    window.store.focusMode = focusMode;

    return () => {
      
    }
  }, [focusMode]);

  React.useEffect(() => {

    return () => {

    }
  }, [domInfo]);

  //#endregion


  const injectDOMEventInBody = async () => {
    document.addEventListener("click", async (e) => {
      let strClassList = '';
      
      if (!window.store.switchExtensionFunctionality) return;

      if(!containsBookmarkModule(e)) {
        
        const isNotDomInfoComponent = !domUtils.ancestorExistsByClassName(e.target, "dom-info-dialog-box");
        const isNotBtnDisable = !domUtils.ancestorExistsByClassName(e.target, "dom-switch");
        const isDomOptionsSelection = domUtils.ancestorExistsByClassName(e.target, "dom-options");
        
        if (!isNotBtnDisable || !isNotDomInfoComponent || isDomOptionsSelection || window.store.bookmarkBtnClicked || e.target.localName === 'path')
          return;

        //capture all classes of the dom for bookmark module
        for (let domClass of e.target.classList.values()) {
          if(domClass !== 'focused-dom') {
            strClassList += `.${domClass}`
          }
        }
    
        //get the least properties for bookmark module
        setSelectedElem({
          elClassNames: strClassList,
          domType: e.target.nodeName?.toLowerCase(),
          domId: e.target.getAttribute('data-id'),
          x: e.pageX,
          y: e.pageY,
          domTarget: e.target,
          domLeanDetails
        });
        
         
  
        const elTarget = e.target;
  
        if (elTarget.id !== "closeDom") {
          e.preventDefault();
  
          const extractedDomInfo = domUtils.extractDomInfo(elTarget);
          const pageYcoordinate = e.pageY;
  
          const sheet = jss
            .createStyleSheet(
              {
                domBorder: {
                  border: `3px solid ${extractedDomInfo.bordercolor}`,
                  'border-radius': '8px'
                }               
              },
              {classNamePrefix :'custom-css'}
            )
            .attach();
 
          //for modifying style directly...
          e.target.classList.add(sheet.classes.domBorder);
          //sets data-id to the DOM
          e.target.setAttribute('data-id', extractedDomInfo.dataId);
          e.target.setAttribute('data-dom-lens-injected', true);         
    
          await setDomInfo(value => {
            return [...value,
            {
              ...extractedDomInfo,
              cssClassesAssigned: sheet.classes.domBorder,
              x: e.pageX,
              y: pageYcoordinate + 100
            }
            ]
          });
          
  
          // Immediately-Invoked Function Expression algorithm to preserve y-coordinate value once the execution context is already finished.
          (function (pageYcoordinate) {
            setTimeout(async () => { //delay the y-coordinate change in microseconds to trigger the y-axis animation of dialog box
              setDomInfo(values => {
  
                const mappedValues = values.map((val, idx) => {
                  if (idx === values.length - 1) {
                    val.y = pageYcoordinate
                  }
                  return val;
                });
  
                return mappedValues;
              });
            }, 10);
          }(pageYcoordinate));


        }
      }
      
    });

    document.addEventListener("mouseover", async (e) => {
      if (!containsBookmarkModule(e)) {
        if (!window.store.switchExtensionFunctionality || window.store.focusMode) return;


        const isNotDomInfoComponent = !domUtils.ancestorExistsByClassName(e.target, "dom-info-dialog-box");
        const isNotBtnDisable = !domUtils.ancestorExistsByClassName(e.target, "dom-switch");
        const isNotSelectedDomFromBookmark = !domUtils.ancestorExistsByClassName(e.target, 'selected-dom');
        

        if (isNotDomInfoComponent && isNotBtnDisable && e.target.nodeName !== "HTML" && isNotSelectedDomFromBookmark && !focusMode) {
          const domType = e.target.nodeName?.toLowerCase();
          await setDomLeanDetails({
            ...domLeanDetails,
            elId: e.target.id,
            domType,
            elClassNames: [...e.target.classList],
          }); //note: we used `await` implementation to wait for setState to finish setting the state before we append the React component to DOM. Not doing this would result in a bug and the DOM details we set in state won't be captured in the DOM.
          e.target.classList.toggle("focused-dom");
          // e.target.appendChild(refDomHighlight.current); //TODO: restore this later
        }
      }
    });

    document.addEventListener("mouseout", e => {
      if(!containsBookmarkModule(e)) {
        if (!window.store.switchExtensionFunctionality || window.store.focusMode) return;
  
        const isNotDomInfoComponent = !domUtils.ancestorExistsByClassName(e.target, "dom-info-dialog-box");
        const isNotBtnDisable = !domUtils.ancestorExistsByClassName(e.target, "dom-switch");
        const isNotSelectedDomFromBookmark = !domUtils.ancestorExistsByClassName(e.target, 'selected-dom');
  
        if (isNotDomInfoComponent && isNotBtnDisable && e.target.nodeName !== "HTML" && isNotSelectedDomFromBookmark) {
          e.target.classList.toggle("focused-dom");
          // e.target.removeChild(refDomHighlight.current); //TODO: restore this later
        }
      }
    });
  };

  const getPageContent = async (url) => {
    if (!localStorage.getItem("webpage")) {
      const axios = await import("axios");

      const res = await axios.get(url);
      localStorage.setItem("webpage", res.data);
    }

    document.getElementById("samplePage").innerHTML =
      localStorage.getItem("webpage");
    injectDOMEventInBody();
  };

  const handleRemoveDialogBox = (idx, id, uniqueID) => {

    const currDomInfo = domInfo.find((x, currentIdx) => currentIdx === idx);
    const newDomInfo = domInfo.filter((x, currentIdx) => currentIdx !== idx);


    const currentEl = document.querySelector(`[data-id="${uniqueID}"]`);

    if(currentEl) 
      currentEl.classList.remove(currDomInfo.cssClassesAssigned);
      

    setFocusMode(false);
    setDomInfo(newDomInfo);
  };

  const containsBookmarkModule = (e) => {
    
    const isBookmarkPanel = domUtils.ancestorExistsByClassName(e.target, 'bookmark-panel');

    return isBookmarkPanel;
  }

  const onClickOption = (e) => {
    setShowAddBookmarkPanel(true)
  }

  const onCloseAddBookmark = (e) => {
    setSelectedAddBookmarkDomElIdx(null);
    setShowAddBookmarkPanel(false);

    window.store.bookmarkBtnClicked = false; //set the store to false afterwards
  }

  const onClickAddBookmark = (idx) => {
    setSelectedAddBookmarkDomElIdx(idx);
    setShowAddBookmarkPanel(!showAddBookmarkPanel);
  }

  const onClickFocus = (elTarget) => {
    setFocusMode(!focusMode);
    elTarget.classList.toggle('focused-targeted-element');
  }

  // Re-render bookmarks list state here to update the bookmarks list
  const onChangeBookmarks = () => {
    setTimeout(() => {
      updateBookmarksStore(); //needs to be called so that bookmarksStore will get the latest update from localStorage
      setStateBookmarks(bookmarksStore);
    }, 500);
  }

  return (
    <GlobalContext.Provider value={{ selectedDom: selectedElem.domTarget, onChangeBookmarks }}>
      {/* website page renders here... */}
      {!PRODUCTION_MODE && <div id="samplePage"></div>}
      <div id="dimmer" className={`${focusMode && 'dimmer-show'}`}></div>
      <div onClick={onTurnOffExtension}>{switchExtensionFunctionality && <DomSwitch />}</div>

      {switchExtensionFunctionality && (
        <div>
          {/* TODO:
                1. Toggle bookmark as enabled once the DomInfoDialogbox instance is saved in bookmarks list (We can do this by comparing HTML elements saved in bookmarks against dialogbox element) - DONE
                2. Change the behavior of toggle bookmark when an existing bookmark is already saved for the same DOM element clicked. Remove the bookmark instead if it exists in bookmark list
          */}
          {domInfo.map((domInfo, idx) => {

            const elBookmarks = bookmarksStore.map(({ elem, domIndex }) => domUtils.getElementByTagAndIndex(elem, domIndex));
            const hasExistingBookmark = elBookmarks.some(el => el === domInfo.domElement);
            
            const hasExistingAnnotations = domUtils.hasAnnotations(annotationStore, domInfo.domElement);
              
            return (
              <DomInfoDialogBox
                key={idx}
                idx={idx}
                id={domInfo.id}
                tag={domInfo.tag}
                classNames={domInfo.classNames}
                classNamesString={domInfo.classNamesString}
                parent={domInfo.parent}
                children={domInfo.children}
                top={domInfo.y}
                left={domInfo.x}                          
                onClose={handleRemoveDialogBox}
                fontsize={domInfo.size}
                fontfamily={domInfo.family}
                textcolor={domInfo.textcolor}
                borderclr={domInfo.bordercolor}
                domElement={domInfo.domElement}
                uniqueID={domInfo.uniqueID}
                dataAttributes={domInfo.attributes}
                onClickOption={onClickOption}
                onClickFocus={onClickFocus}
                focusMode={focusMode}
                onClickBookmarkEmit={onClickAddBookmark}
                hasExistingBookmark={selectedAddBookmarkDomElIdx === idx || hasExistingBookmark} 
                hasExistingAnnotations={hasExistingAnnotations}
              />
            );
          })}

          {/* Note: This component is used to inject this into DOM element once we hover and display minimal details the DOM needs */}
          <DomMinimalDetailsWidget
            ref={refDomHighlight}
            elId={domLeanDetails.elId}            
            elClassNames={domLeanDetails.elClassNames}
            domType={domLeanDetails.domType}          
            show={true}
          />

          <BookmarkPanel
            bookmarks={stateBookmarks}
            onRemoveBookmarkEmit={onChangeBookmarks}
          />
        </div>
      )}

  
      {/* 
      // TODO by Sonny: Build DevTools to change webpage inside localhost dynamically
      <div id="divDevTools" style={{ padding: '10px', position: 'fixed', right: '50px', bottom: '50px', background: '#fff', border: '2px solid #000', height: '250px', width: '250px' }}>
        <h1>Developer Tools here..</h1>
        <input type="text" name="" id="" placeholder="input url to render page" onChange={e => setTxtFieldPageUrl(e.target.value)} />
        <br />
        <button onClick={() => getPageContent(txtFieldPageUrl)}>Enter</button>
      </div> 
      */}
    </GlobalContext.Provider>
  );
}

// export default App;
export default hot(module)(App);
