import React, { Component, useEffect, useState } from 'react';
import { hot } from "react-hot-loader";
import axios from 'axios';


function App() {

  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [domInfo, setDomInfo] = useState({ id: "", class: "" });

  useEffect(() => {
    
    axios.get('https://web.archive.org/web/20131014212210/http://stackoverflow.com/').then(res => {
      document.getElementById('samplePage').innerHTML = res.data;

      document.addEventListener('click', e => {
        setCoordinates({ top: e.pageY, left: e.pageX });
        setDomInfo({ ...domInfo, id: e.target.id, class: e.target.className });
      });
    });

    return () => {
      
    }
  }, []);

  return (
    <div>

      <div id="samplePage"></div>
      <div style={{ height: '250px', width: '350px', background: 'white', border: '3px solid green', borderRadius: '20px', position: 'absolute', top: `${coordinates.top}px`, left: `${coordinates.left}px` }}>

        <h1>Element ID: {domInfo.id}</h1>
        <h2>Class: {domInfo.class}</h2>

        {/* TODO: add other HTML information such as:
              - Its content(or text content)
              - Its children(get ID and class)
              - Its dom parent (get the parent ID and classes)
        */}
      </div>
    </div>
  )
}



export default hot(module)(App);