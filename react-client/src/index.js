import ReactDOM from 'react-dom';
import React from 'react';

import App from './Components/App';
import './style.scss';

import { PRODUCTION_MODE } from './keys';

if (module.hot) {
    console.log("hot module!");
}

if (PRODUCTION_MODE) {
    const rootEl = document.createElement('div');
    rootEl.id = 'root';

    document.body.appendChild(rootEl);
}


ReactDOM.render(<App />, document.getElementById("root"));