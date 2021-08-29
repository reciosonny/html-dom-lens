import { PRODUCTION_MODE } from './src/keys';
import "preact/debug";    

// TODO: need to figure out how to conditionally render "debug" scripts for preact so it won't be included in bundle size.
// if (!PRODUCTION_MODE) {
//     // Must be the first import
//     import "preact/debug";    
// }

import ReactDOM from 'react-dom';
import React from 'react';

import App from './src/Components/App';
import './style.scss';


if (module.hot) {
    console.log("hot module!");
}

const rootEl = document.createElement('div');
rootEl.id = 'htmlDomInfoRoot';

document.body.appendChild(rootEl);


ReactDOM.render(<App />, document.getElementById("htmlDomInfoRoot"));