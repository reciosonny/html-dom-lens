import { PRODUCTION_MODE } from './keys';
import "preact/debug";    

// TODO: need to figure out how to conditionally render "debug" scripts for preact so it won't be included in bundle size.
// if (!PRODUCTION_MODE) {
//     // Must be the first import
//     import "preact/debug";    
// }

import ReactDOM from 'react-dom';
import React from 'react';

import App from './Components/App';
import './style.scss';


if (module.hot) {
    console.log("hot module!");
}

if (PRODUCTION_MODE) {
    const rootEl = document.createElement('div');
    rootEl.id = 'root';

    document.body.appendChild(rootEl);
}


ReactDOM.render(<App />, document.getElementById("root"));