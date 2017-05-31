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

import Portfolio from "./Components/Portfolio/Portfolio";
import PortfolioHeader from "./Components/Portfolio/PortfolioHeader";
import Collections from "./Components/Collections/Collections";
import CollectionsHeader from "./Components/Collections/CollectionsHeader";
import Browse from "./Components/Browse/Browse";
import BrowseHeader from "./Components/Browse/BrowseHeader";

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
    console.log(this.props);
  };

  render() {
    const collectionsIcon = <FontIcon className="fa fa-img" />;
    const portfolioIcon = <FontIcon className="fa fa-img" />;
    const browseIcon = <FontIcon className="fa fa-img" />;

    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="page-menu">
              <Route path="/collections" component={() => <CollectionsHeader collections={this.props.collections} />} />
              <Route path="/portfolio" component={PortfolioHeader} />
              <Route path="/browse" component={BrowseHeader} />
            </div>
          </div>
          <Route path="/collections" component={() => <Collections images={this.props.images} />} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/browse" component={Browse} />
          <Route exact path="/" render={() => <Redirect to="/collections" />} />
          <div className="menu-container">
            <ul className="main-menu">
              <li className="menu-item">
                <Link to="/collections">
                  <i className="fa fa-picture-o" aria-hidden="true" />
                  Collections
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/portfolio">
                  <i className="fa fa-briefcase" aria-hidden="true" />Portfolio
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/browse">
                  <i className="fa fa-wpexplorer" aria-hidden="true" />Browse
                </Link>
              </li>
            </ul>
          </div>
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

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

export default connect(mapStateToProps)(App);
