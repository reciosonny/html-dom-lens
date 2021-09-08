import React, { Component, useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import DomInfoDialogBox from "./DomInfoDialogBox";
import { PRODUCTION_MODE } from "../keys";
import DomMinimalDetailsWidget from "./DomMinimalDetailsWidget";
import DomSwitch from "./DomSwitch";

import * as domUtils from '../utils/domUtils';


function App() {
  const [domInfo, setDomInfo] = useState([]);
  const [domLeanDetails, setDomLeanDetails] = useState({
    elId: "",
    elClassNames: [],
    domType: "",
  });
  const [domSwitch, setdomSwitch] = useState(true);
  const [initialState, setInitialState] = React.useState();
  const switchdom = () => {
    setdomSwitch(!domSwitch);
    //  debugger
  };

  // debugger;
  const refDomHighlight = React.useRef(null);

  useEffect(() => {
    if (!PRODUCTION_MODE) {
      /**
       * Note: swap the urls for testing different websites. Sample websites for testing:
       * https://web.archive.org/web/20131014212210/http://stackoverflow.com/
       */
      getPageContent('https://www.redfin.com/');
      // getPageContent(
      //   "https://facebook.com"
      // );
    } else {
      injectDOMEventInBody();
    }

    return () => {};
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  const injectDOMEventInBody = async () => {
    document.addEventListener("click", (e) => {
      if (e.target.id !== "closedompeeker" && domSwitch == true) {
        e.preventDefault();

        const children = [...e.target.children].map(child => {
          return { id: child.id, class: child.className };
        });

        setDomInfo((dominfo) => [
          ...dominfo,
          {
            x: e.pageX,
            y: e.pageY,
            id: e.target.id,
            clsname: e.target.className,
            children: children,
            parentID: e.target.parentElement.id,
            parentClass: e.target.parentElement.className,
          },
        ]);
      }
    });

    document.addEventListener("mouseover", async (e) => {
      
      const isNotDomInfoComponent = !domUtils.ancestorExistsByClassName(e.target, "dom-info-dialog-box");

      if (isNotDomInfoComponent && e.target.nodeName !== "HTML") {

        const domType = e.target.nodeName?.toLowerCase();

        await setDomLeanDetails({ ...domLeanDetails, elId: e.target.id, domType, elClassNames: [...e.target.classList] }); //note: we used `await` implementation to wait for setState to finish setting the state before we append the React component to DOM. Not doing this would result in a bug and the DOM details we set in state won't be captured in the DOM.

        e.target.classList.toggle("focused-dom");

        e.target.appendChild(refDomHighlight.current.base);
      }
    });

    document.addEventListener("mouseout", (e) => {

      const isNotDomInfoComponent = !domUtils.ancestorExistsByClassName(e.target, "dom-info-dialog-box");

      if (isNotDomInfoComponent && e.target.nodeName !== "HTML") {
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

  const handleRemoveDialogBox = (idx) => {

    const newDomInfo = domInfo.filter((x, currentIdx) => currentIdx !== idx);

    setDomInfo(newDomInfo);
  }
  // const resetdom = () => setshowSwitch(true);

  return (
    <div>
      {/* website page renders here... */}
      {!PRODUCTION_MODE && <div id="samplePage"></div>}

      <div onClick={switchdom}>{domSwitch && <DomSwitch />}</div>

      {domSwitch && (
        <div>
          {domInfo.map((domInfo, idx) => (
            <DomInfoDialogBox
              key={idx}
              idx={idx}
              id={domInfo.id}
              clsname={domInfo.clsname}
              parentId={domInfo.parentID}
              parentClass={domInfo.parentClass}                
              child={domInfo.child}                
              children={domInfo.children}
              top={domInfo.y}
              left={domInfo.x}
              onClose={handleRemoveDialogBox}
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
