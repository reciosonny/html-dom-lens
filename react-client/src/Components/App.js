import React, { Component, useEffect, useState } from "react";
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

window.store = {};

function App() {
  const [domInfo, setDomInfo] = useState([]);
  const [domLeanDetails, setDomLeanDetails] = useState({
    elId: "",
    elClassNames: [],
    domType: "",
  });
  const [domSwitch, setdomSwitch] = useState(true);
  const [initialState, setInitialState] = React.useState();
  const [showAddBookmarkPanel, setShowAddBookmarkPanel] = useState(false)
  const [selectedElem, setSelectedElem] = useState({});

  const switchdom = (e) => {
    setdomSwitch(!domSwitch);
  }

  const [switchExtensionFunctionality, setExtension] = useState(true);

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
    setExtension(false);
  };
  const refDomHighlight = React.useRef(null);



  useEffect(() => {
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
        setExtension(true);

        if (msg.text === 'are_you_there_content_script?') {
          sendResponse({ status: "yes" });
        }
      });

    }

    return () => { };
  }, []);


  React.useEffect(() => {

    //dirty way to get the value from state since normal JS event handlers cannot communicate the state well with React
    window.store.switchExtensionFunctionality = switchExtensionFunctionality;

    return () => {

    }
  }, [switchExtensionFunctionality]);

  React.useEffect(() => {

    return () => {

    }
  }, [domInfo]);



  const injectDOMEventInBody = async () => {
    document.addEventListener("click", async (e) => {
      let strClassList = '';
      if(!containsBookmarkModule(e)) {
        if (!window.store.switchExtensionFunctionality) return;
  
        const isNotBtnDisable = !domUtils.ancestorExistsByClassName(
          e.target,
          "dom-switch"
        );
  
        if (!isNotBtnDisable)
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
  
        if (elTarget.id !== "closedompeeker") {
          e.preventDefault();
  
          const extractedDomInfo = domUtils.extractDomInfo(e.target);
          const pageYcoordinate = e.pageY;
  
          const sheet = jss
            .createStyleSheet(
              {
                domBorder: {
                  border: `3px solid ${extractedDomInfo.bordercolor}`,
                  'border-radius': '8px'
                }
              }
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
        if (!switchExtensionFunctionality) return;


        const isNotDomInfoComponent = !domUtils.ancestorExistsByClassName(
          e.target,
          "dom-info-dialog-box"
        );
        const isNotBtnDisable = !domUtils.ancestorExistsByClassName(
          e.target,
          "dom-switch"
        );

        const isNotSelectedDomFromBookmark = !domUtils.ancestorExistsByClassName(
          e.target,
          'selected-dom'
        )

        if (!window.store.switchExtensionFunctionality) return;

        if (isNotDomInfoComponent && isNotBtnDisable && e.target.nodeName !== "HTML" && isNotSelectedDomFromBookmark) {
          const domType = e.target.nodeName?.toLowerCase();
          await setDomLeanDetails({
            ...domLeanDetails,
            elId: e.target.id,
            domType,
            elClassNames: [...e.target.classList],
          }); //note: we used `await` implementation to wait for setState to finish setting the state before we append the React component to DOM. Not doing this would result in a bug and the DOM details we set in state won't be captured in the DOM.
          e.target.classList.toggle("focused-dom");
          e.target.appendChild(refDomHighlight.current.base);
        }
      }
    });

    document.addEventListener("mouseout", e => {
      if(!containsBookmarkModule(e)) {
        if (!window.store.switchExtensionFunctionality) return;
  
        const isNotDomInfoComponent = !domUtils.ancestorExistsByClassName(
          e.target,
          "dom-info-dialog-box"
        );
        const isNotBtnDisable = !domUtils.ancestorExistsByClassName(
          e.target,
          "dom-switch"
        );

        const isNotSelectedDomFromBookmark = !domUtils.ancestorExistsByClassName(
          e.target,
          'selected-dom'
        )
        console.log(isNotSelectedDomFromBookmark);
  
        if (isNotDomInfoComponent && isNotBtnDisable && e.target.nodeName !== "HTML" && isNotSelectedDomFromBookmark) {
          e.target.classList.toggle("focused-dom");
          e.target.removeChild(refDomHighlight.current.base);
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

    document.querySelector(`[data-id="${uniqueID}"]`).classList.remove(currDomInfo.cssClassesAssigned);

    setDomInfo(newDomInfo);
  };

  const containsBookmarkModule = (elem) => {
    if (elem.target.classList.contains('bookmark-btn') ||
      elem.target.classList.contains('card-bookmark') ||
      elem.target.closest('.card-bookmark') ||
      elem.target.classList.contains('add__bookmark-panel') ||
      elem.target.closest('.add__bookmark-panel') ||
      elem.currentTarget.querySelector('.dom-options') ||
      elem.target.classList.contains('.selected__dom-bookmark') ||
      elem.target.closest('.selected__dom-bookmark')) {
      return true
    }
    return false
  }

  const onClickOption = (e) => {
    setShowAddBookmarkPanel(true)
  }

  const onCloseOption = (e) => {
    setShowAddBookmarkPanel(false)
  }


  return (
    <div>
      {/* website page renders here... */}
      {!PRODUCTION_MODE && <div id="samplePage"></div>}

      <div onClick={onTurnOffExtension}>{switchExtensionFunctionality && <DomSwitch />}</div>

      {switchExtensionFunctionality && (
        <div>
          {domInfo.map((domInfo, idx) => (
            <DomInfoDialogBox
              key={idx}
              idx={idx}
              id={domInfo.id}
              clstag={domInfo.clstag}
              clsname={domInfo.clsname}
              parenttag={domInfo.parenttag}
              parentId={domInfo.parentID}
              parentClass={domInfo.parentClass}
              parent={domInfo.parent}
              children={domInfo.children}
              top={domInfo.y}
              left={domInfo.x}
              onClose={handleRemoveDialogBox}
              fontsize={domInfo.size}
              fontfamily={domInfo.family}
              textcolor={domInfo.textcolor}
              borderclr={domInfo.bordercolor}
              uniqueID={domInfo.uniqueID}
              dataAttributes={domInfo.attributes}
              onClickOption={onClickOption}
              showAddBookmarkPanel={showAddBookmarkPanel}
            />
          ))}
          <DomMinimalDetailsWidget
            ref={refDomHighlight}
            elId={domLeanDetails.elId}
            elClassNames={domLeanDetails.elClassNames}
            domType={domLeanDetails.domType}
            show={true}
          />

          <BookmarkPanel
            elClassNames={selectedElem.elClassNames}
            domType={selectedElem.domType}
            x={selectedElem.x}
            y={selectedElem.y}
            domId={selectedElem.domId}
            showAddBookmarkPanel={showAddBookmarkPanel}
            setShowAddBookmarkPanel={setShowAddBookmarkPanel}
            onCloseOption={onCloseOption}
            domTarget={selectedElem.domTarget}
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
    </div>
  );
}

export default hot(module)(App);
