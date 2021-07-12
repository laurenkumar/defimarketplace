import React from "react";
import ReactDOM from "react-dom";
import "./assets/bootstrap-reboot.css";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import ScrollToTop from "./scrollToTop";
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './utils/web3React';

ReactDOM.render(
        <React.StrictMode>
          <Router>
            <ScrollToTop />
            <StateProvider initialState={initialState} reducer={reducer}>
              <Web3ReactProvider getLibrary={getLibrary}>
                <App />
              </Web3ReactProvider>
            </StateProvider>
          </Router>
        </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
