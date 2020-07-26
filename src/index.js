import React from 'react';
import ReactDOM from 'react-dom';
import Home from './homepage/Home.js';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {HashRouter} from 'react-router-dom'
//import './homepage/Home.css'

ReactDOM.render(
    <HashRouter basename={process.env.PUBLIC_URL}>
    <Home />
    </HashRouter>
    , document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
