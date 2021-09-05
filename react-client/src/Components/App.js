import React, { Component, useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import DomInfoDialogBox from "./DomInfoDialogBox";

import { PRODUCTION_MODE } from "../keys";

function App() {
  const [domInfo, setDomInfo] = useState([]);
  // const [domInfo, setDomInfo] = useState({
  //   id: [],
  //   class: "",
  //   childcount: "",
  //   sample: "",
  //   parentID: "",
  //   parentClass: "",
  //   child: { ids: [], classes: [], totalCount: 0 },
  //   coordinates: { top: [], left: [] },
  // });

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
    } else {
      injectDOMEventInBody();
    }

    return () => {};
  }, []);

  const injectDOMEventInBody = async () => {
    document.addEventListener("click", (e) => {
      if (e.target.id !== "closedompeeker") {
        e.preventDefault();

        const reduceChild = [...e.target.children].reduce(
          (init, curr) => {
            init.ids.push(curr.id);
            init.classes.push(curr.className);
            return init;
          },
          { ids: [], classes: [] }
        );

        //My work around state  requesting discussion regarding state
        setDomInfo((dominfo) => [
          ...dominfo,
          {
            x: e.pageX,
            y: e.pageY,
            id: e.target.id,
            clsname: e.target.className,
            child: { ...reduceChild, totalCount: e.target.childElementCount },
            parentID: e.target.parentElement.id,
            parentClass: e.target.parentElement.className,
          },
        ]);
        //My work around state  requesting discussion regarding state

        // setDomInfo({
        //   ...domInfo,
        //   id: e.target.id,
        //   clsname: e.target.className,
        //   child: { ...reduceChild, totalCount: e.target.childElementCount },
        //   parentID: e.target.parentElement.id,
        //   parentClass: e.target.parentElement.className,
        //   coordinates: { top: e.pageY, left: e.pageX },
        // });
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

  return (
    <div>
       <div
        style={{
          height: "50px",
          width: "150px",
          background: "white",
          color: "blue",
          fontWeight: "800 !important",
          zIndex: "999",
          border: "3px solid green",
          borderRadius: "20px",
          right: 0,
          position: "fixed",
          padding: "15px 0px 0px 0px",
          cursor: "pointer"        
        }}
      >
        This is switch FUnction
      </div>
      {/* website page renders here... */}
      {!PRODUCTION_MODE && <div id="samplePage"></div>}
      <div>
      {/* <div
        style={{
          height: "50px",
          width: "150px",
          background: "white",
          color: "blue",
          fontWeight: "800 !important",
          zIndex: "999",
          border: "3px solid green",
          borderRadius: "20px",
          right: 0,
          position: "fixed",
          padding: "15px 0px 0px 0px",
          cursor: "pointer"        
        }}
      >
        This is switch FUnction
      </div> */}

        {domInfo.map((domInfo) => {
          const handleDelete = () => {
            setDomInfo((prevNotes) =>
              prevNotes.reduce(
                (init, curr) =>
                  curr.x === domInfo.x && curr.y === domInfo.y
                    ? init
                    : init.push(curr) && init,
                []
              )
            );
          };

          return (
            <div>
              {/* <DomInfoDialogBox
                id={domInfo.id}
                clsname={domInfo.clsname}
                parentId={domInfo.parentID}
                parentClass={domInfo.parentClass}
                count={domInfo.count}
                child={domInfo.child}
                coordinates={domInfo.coordinates}
                top={note.y}
                left={note.x}
                closedialog={handleDelete}
                noteid={note.myid}
                
              /> */}
              <DomInfoDialogBox
                id={domInfo.id}
                clsname={domInfo.clsname}
                parentId={domInfo.parentID}
                parentClass={domInfo.parentClass}                
                child={domInfo.child}                
                top={domInfo.y}
                left={domInfo.x}
                closedialog={handleDelete}
              />
            </div>
          );
        })}
      </div>

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
