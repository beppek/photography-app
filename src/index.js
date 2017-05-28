import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
import injectTapEventPlugin from "react-tap-event-plugin";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import App from "./App";
// import Portfolio from "./Components/Portfolio/Portfolio";
// import Collections from "./Components/Collections/Collections";
// import Browse from "./Components/Browse/Browse";

import FirebaseService from "./Firebase/FirebaseService";

import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const fbs = new FirebaseService();
fbs.init();
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
