import React, { Component, useEffect, useState } from 'react';
import { hot } from "react-hot-loader";
import axios from 'axios';

import { PRODUCTION_MODE } from '../keys';

function App() {

  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [domInfo, setDomInfo] = useState({ id: "", class: "" ,childcount:"" ,sample: "",parentID: "", parentClass:""});
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

      getPageContent('https://web.archive.org/web/20131014212210/http://stackoverflow.com/'); 
      
    }

    return () => {
      
    }
  }, []);



  const ClearChildArray = ()=>{
   
      setdomChildID(domChildID => [])
      setdomChildClass(domChildClass => [])
  
  }


  const getPageContent = async (url) => {

    if (!localStorage.getItem('webpage')) {
      const res = await axios.get(url);
      localStorage.setItem('webpage', res.data);  
    }

    document.getElementById('samplePage').innerHTML = localStorage.getItem('webpage');

    document.addEventListener('click', e => {
      if (e.target.id !== 'divDevTools') {

        setdomChildID(domChildID => [])
        setdomChildClass(domChildClass => [])

        setCoordinates({ top: e.pageY, left: e.pageX });
        setDomInfo({ ...domInfo, id: e.target.id, class: e.target.className, childcount:e.target.childElementCount , parentID: e.target.parentElement.id, parentClass: e.target.parentElement.className });     
        
        
        for (var i = 0; i < e.target.childElementCount; i++) {        
          setdomChildID(domChildID => [...domChildID, e.target.children[i].id ])
          setdomChildClass(domChildClass => [...domChildClass , e.target.children[i].className ])                  
        }

      
      }


    });

  }


  return (
    <div>

      {/* website page renders here... */}
      {!PRODUCTION_MODE && <div id="samplePage"></div>}

      {/* widget component... */}
      <div style={{ height: '550px', width: '350px', background: 'white', color: 'blue', fontWeight: '800 !important', zIndex: '999', border: '3px solid green', borderRadius: '20px', position: 'absolute', top: `${coordinates.top}px`, left: `${coordinates.left}px` }}>

     

        <h1>Element ID: {domInfo.id}</h1>
        <h2>Class: {domInfo.class}</h2>
        <h2>Parent ID: {domInfo.parentID}</h2>
        <h2>Parent Class: {domInfo.parentClass}</h2>
        <h2># of Children Element: {domInfo.childcount}</h2>

        
        <p> id of Children Element:</p>
       
              <ul>
               {domChildID.map((child) => (
                <li>{child}</li>          
              ))}       
               </ul>

        <p> Class of Children Element:</p>
       
            <ul>
              {domChildClass.map((child) => (
              <li>{child}</li>          
            ))}       
              </ul>      
    

        {/* TODO: add other HTML information such as:
              - Its content(or text content)
              - Its children(get ID and class)
              - Its dom parent (get the parent ID and classes)
        */}
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
  )
}


export default hot(module)(App);