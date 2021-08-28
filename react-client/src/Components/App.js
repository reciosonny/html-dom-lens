import React, { Component, useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import Modal from "./DialogBoxModal";

import { PRODUCTION_MODE } from "../keys";

function App() {
  // const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [domInfo, setDomInfo] = useState({
    id: "",
    class: "",
    childcount: "",
    sample: "",
    parentID: "",
    parentClass: "",
    child: { count: 0, id: [], classes: [] },
    coordinates: { top: 10, left: 10 },
  });
  const [domChildID, setdomChildID] = useState([]);
  const [domChildClass, setdomChildClass] = useState([]);
  const [txtFieldPageUrl, setTxtFieldPageUrl] = useState("");

  useEffect(() => {
    if (!PRODUCTION_MODE) {
      /**
       * Note: swap the urls for testing different websites. Sample websites for testing:
       * https://web.archive.org/web/20131014212210/http://stackoverflow.com/
       */
      // getPageContent('https://www.redfin.com/');

      getPageContent(
        "https://web.archive.org/web/20131014212210/http://stackoverflow.com/"
      );
    }

    return () => {};
  }, []);

  const getPageContent = async (url) => {
    if (!localStorage.getItem("webpage")) {
      const res = await axios.get(url);
      localStorage.setItem("webpage", res.data);
    }

    document.getElementById("samplePage").innerHTML =
      localStorage.getItem("webpage");

    document.addEventListener("click", (e) => {
      if (e.target.id !== "divDevTools") {
        e.preventDefault();
        debugger
        const reduceChild = [...e.target.children].reduce((init, curr) => {
          init.ids.push(curr.id);
          init.classes.push(curr.className);
          return init;
        },{ids:[],classes:[]});

        setdomChildID((domChildID) => []);
        setdomChildClass((domChildClass) => []);

        // setCoordinates({ top: e.pageY, left: e.pageX });
        setDomInfo({
          ...domInfo,
          id: e.target.id,
          class: e.target.className,
          childcount: e.target.childElementCount,
          parentID: e.target.parentElement.id,
          parentClass: e.target.parentElement.className,
          coordinates: { top: e.pageY, left: e.pageX },
        });

        // for (var i = 0; i < e.target.childElementCount; i++) {
        //   // BAD CODING. STATE DATA NOT GROUPED PROPERLY
        //   setdomChildID(domChildID => [...domChildID, e.target.children[i].id ])
        //   setdomChildClass(domChildClass => [...domChildClass , e.target.children[i].className ])
        // }
      }
    });
  };

  return (
    <div>
      {/* website page renders here... */}
      {!PRODUCTION_MODE && <div id="samplePage"></div>}

      <Modal
        id={domInfo.id}
        clsname={domInfo.clsname}
        parentId={domInfo.parentID}
        parentClass={domInfo.parentClass}
        count={domInfo.count}
        child={domInfo.child}
        coordinates={domInfo.coordinates}       
      />

      {/* BAD CODING. WIDGET NOT ISOLATED IN ANOTHER REACT COMPONENT */}

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
