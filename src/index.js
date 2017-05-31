import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import injectTapEventPlugin from "react-tap-event-plugin";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import store from "./store";
import * as imageActions from "./actions/imageActions";
import * as collectionsActions from "./actions/collectionsActions";
import App from "./App";

import FirebaseService from "./Firebase/FirebaseService";

import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const fbs = new FirebaseService();
fbs.init();
injectTapEventPlugin();

store.dispatch((dispatch) => {
  imageActions.fetchImages(dispatch);
  collectionsActions.fetchCollections(dispatch);
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
