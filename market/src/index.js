import React from "react";
import ReactDOM from "react-dom";
import "./assets/bootstrap-reboot.css";
import "./index.css";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import {StateProvider} from "./StateProvider";
import reducer, {initialState} from "./reducer";
import { Provider } from "react-redux";
import Store from "./store";
import ScrollToTop from "./components/misc/scrollToTop";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <StateProvider initialState={initialState} reducer={reducer}>
        <Provider store={Store}>
          <App />
        </Provider>
      </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
