import { PRODUCTION_MODE } from './src/keys';

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


if(!PRODUCTION_MODE) { //if not for production, load preact/debug tool
    import("preact/debug").then(preactDebug => {
        console.log('importing preact debug... ', preactDebug);
        ReactDOM.render(<App />, document.getElementById("htmlDomInfoRoot"));
    });
} else {
    ReactDOM.render(<App />, document.getElementById("htmlDomInfoRoot"));
}
