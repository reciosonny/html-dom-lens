import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';


import App from './Components/App';
import './style.scss';


window.axios = axios;

if (module.hot) {
    console.log("hot module!");
}


ReactDOM.render(<App />, document.getElementById("root"));