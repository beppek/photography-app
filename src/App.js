import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import {
  BottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";
import FontIcon from "material-ui/FontIcon";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";

import HeaderMenu from './Components/Menus/HeaderMenu';

import Portfolio from "./Components/Portfolio/Portfolio";
import Collections from "./Components/Collections/Collections";
import Browse from "./Components/Browse/Browse";

import logo from "./logo2.png";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  select = index => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const collectionsIcon = <FontIcon className="fa fa-img" />;
    const portfolioIcon = <FontIcon className="fa fa-img" />;
    const browseIcon = <FontIcon className="fa fa-img" />;

    return (
      <Router>
        <div className="App">
          <div className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <HeaderMenu {...this.props} />
          </div>
          <Route path="/collections" component={() => <Collections />} />
          <Route path="/home" component={() => <Collections />} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/browse" component={Browse} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images.images,
    collections: state.collections.collections
  }
}

export default connect(mapStateToProps)(App);
