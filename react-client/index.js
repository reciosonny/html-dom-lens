import { PRODUCTION_MODE } from './src/keys';

import ReactDOM from 'react-dom';
import React from 'react';
import jss from 'jss';

import App from './src/Components/App';
import './styles/style.scss';


if (module.hot) {
    console.log("hot module!");
}

const rootEl = document.createElement('div');
rootEl.id = 'htmlDomInfoRoot';

document.body.appendChild(rootEl);

//#region Injecting fonts to javascript...
let font = new FontFace("Roboto Mono", "url('https://fonts.gstatic.com/s/robotomono/v13/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_7Pq_ROW4.woff2')");
document.fonts.add(font);
//#endregion

// Pass the id option to jss.setup and set minify to true.
// TODO: minification still isn't working properly. Fix this in the future release
jss.setup({id: {minify: true}});

if(!PRODUCTION_MODE) { //if not for production, load preact/debug tool
    import("preact/debug").then(preactDebug => {
        console.log('importing preact debug... ', preactDebug);
        ReactDOM.render(<App />, document.getElementById("htmlDomInfoRoot"));
    });
} else {
    ReactDOM.render(<App />, document.getElementById("htmlDomInfoRoot"));
}
