import React, { Component, useEffect, useState } from "react";
import { hot } from "react-hot-loader";


import DomInfoDialogBox from "./DomInfoDialogBox";
import { PRODUCTION_MODE } from "../keys";
import DomMinimalDetailsWidget from "./DomMinimalDetailsWidget";
import DomSwitch from "./DomSwitch";

import * as domUtils from "../utils/domUtils";

window.store = {};

function App() {
  const [domInfo, setDomInfo] = useState([]);
  const [domLeanDetails, setDomLeanDetails] = useState({
    elId: "",
    elClassNames: [],
    domType: "",
  });
  const [switchExtensionFunctionality, setExtension] = useState(true);

  const turnOffExtension = () => {
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

      //chrome-related events
      chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        setExtension(true);

        if (msg.text === 'are_you_there_content_script?') {
          sendResponse({status: "yes"});
        }
      });

    }

    return () => {};
  }, []);


  React.useEffect(() => {
    
    //dirty way to get the value from state since normal JS event handlers cannot communicate the state well with React
    window.store.switchExtensionFunctionality = switchExtensionFunctionality;

    if (!switchExtensionFunctionality) {
      setDomInfo([]); //if DOM extension is turned off, empty the DOM info state array
    }
    
    return () => {
      
    }
  }, [switchExtensionFunctionality]);



  const injectDOMEventInBody = async () => {
    document.addEventListener("click", async (e) => {

      if(!window.store.switchExtensionFunctionality) return;

      const elTarget = e.target;

      if (elTarget.id !== "closedompeeker") {
        e.preventDefault();

        const extractedDomInfo = domUtils.extractDomInfo(e.target);        
        const pageYcoordinate = e.pageY;
        
        await setDomInfo(value => {
          return [...value,
            {
              ...extractedDomInfo,
              x: e.pageX,
              y: pageYcoordinate + 100                        
            }
          ]
        });

        //sets data-id to the DOM
        e.target.setAttribute("data-id" , extractedDomInfo.dataId);
        //for modifying style directly...
        e.target.style.cssText += `border:3px solid;border-color: ${extractedDomInfo.bordercolor}`;


        // Immediately-Invoked Function Expression algorithm to preserve y-coordinate value once the execution context is already finished.
        (function(pageYcoordinate) {
          setTimeout(async () => { //delay the y-coordinate change in microseconds to trigger the y-axis animation of dialog box
            setDomInfo(values => {

              const mappedValues = values.map((val, idx) => {
                if(idx === values.length-1) {
                  val.y = pageYcoordinate
                }
                return val;
              });

              return mappedValues;
            });
          }, 10);
        }(pageYcoordinate));
      }
    });

    document.addEventListener("mouseover", async (e) => {

      if(!window.store.switchExtensionFunctionality) return;

      const isNotDomInfoComponent = !domUtils.ancestorExistsByClassName(
        e.target,
        "dom-info-dialog-box"
      );
      const isNotBtnDisable = !domUtils.ancestorExistsByClassName(
        e.target,
        "dom-switch"
      );

      if (isNotDomInfoComponent && isNotBtnDisable && e.target.nodeName !== "HTML") {
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
    });

    document.addEventListener("mouseout", e => {

      if(!window.store.switchExtensionFunctionality) return;

      const isNotDomInfoComponent = !domUtils.ancestorExistsByClassName(
        e.target,
        "dom-info-dialog-box"
      );
      const isNotBtnDisable = !domUtils.ancestorExistsByClassName(
        e.target,
        "dom-switch"
      );

      if (isNotDomInfoComponent && isNotBtnDisable && e.target.nodeName !== "HTML") {
        e.target.classList.toggle("focused-dom");
        e.target.removeChild(refDomHighlight.current.base);
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
    const newDomInfo = domInfo.filter((x, currentIdx) => currentIdx !== idx);
    
    document.querySelector('[data-id="'+uniqueID+'"]').style.removeProperty('border');


    setDomInfo(newDomInfo);
  };

  return (
    <div>
      {/* website page renders here... */}
      {!PRODUCTION_MODE && <div id="samplePage"></div>}

      <div onClick={turnOffExtension}>{switchExtensionFunctionality && <DomSwitch />}</div>

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
            />
          ))}

          <DomMinimalDetailsWidget
            ref={refDomHighlight}
            elId={domLeanDetails.elId}
            elClassNames={domLeanDetails.elClassNames}
            domType={domLeanDetails.domType}
            show={true}
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
