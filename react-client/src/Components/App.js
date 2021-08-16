import React, { Component, useEffect, useState } from 'react';
import { hot } from "react-hot-loader";
import axios from 'axios';


function App() {

  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });

  useEffect(() => {
    
    axios.get('https://web.archive.org/web/20131014212210/http://stackoverflow.com/').then(res => {
      document.getElementById('samplePage').innerHTML = res.data;

      document.addEventListener('click', e => {
        setCoordinates({ top: e.pageY, left: e.pageX });
        console.log(e);
      });
    });

    return () => {
      
    }
  }, []);

  return (
    <div>
      
      <div style={{ height: '250px', width: '350px', border: '3px solid green', borderRadius: '20px', position: 'absolute', top: `${coordinates.top}px`, left: `${coordinates.left}px` }}>

        <h1>This is UI widget</h1>
      </div>
    </div>
  )
}


const DebugLib = function (Component) {
  
  return function Test() {

    const [count, setCount] = React.useState(0);
    React.useDebugValue('count');

    const [anotherHook, setAnotherHook] = React.useState('')
    React.useDebugValue('anotherHook');

    console.log(this);
    
    React.useEffect(() => {
      
      console.log('React injected...');

      // document.addEventListener('click', e => {
      //   console.log(e);
      // });

      // for styling
      // document.addEventListener('mouseover', e => e.target.style = 'border: 2px solid #000');
      // document.addEventListener('mouseout', e => e.target.style = '');
      // end

      return () => {
        
      }
    }, []);

    return (
      <div>
        {/* <h2 onClick={() => setCount(count+1)}>Count: {count}</h2> */}
        <Component />

        <div id="samplePage"></div>
      </div>
    );
  }
}


export default hot(module)(DebugLib(App));