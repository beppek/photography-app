import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import Portfolio from "./Components/Portfolio/Portfolio";
import Collections from "./Components/Collections/Collections";
import Browse from "./Components/Browse/Browse";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  select = (index) => {
    this.setState({selectedIndex: index});
    // this.context.router.history.push("/portfolio");
    console.log(this.props);
  }

  render() {
    const collectionsIcon = <FontIcon className="fa fa-img"/>;
    const portfolioIcon = <FontIcon className="fa fa-img"/>;
    const browseIcon = <FontIcon className="fa fa-img"/>;

    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <Route path="/collections" component={Collections} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/browse" component={Browse} />
          <Route exact path="/" render={() => (
            <Redirect to="/collections" />
          )} />
          <div className="menu-container">
            <Paper zDepth={1}>
              <BottomNavigation selectedIndex={this.state.selectedIndex}>
                <Link to="/collections">
                <BottomNavigationItem
                  label="Collections"
                  icon={collectionsIcon}
                  onTouchTap={() => this.select(0)}
                />
                </Link>
                <Link to="/portfolio" >
                <BottomNavigationItem
                  label="Portfolio"
                  icon={portfolioIcon}
                  onTouchTap={() => this.select(1)}
                />
                </Link>
                <Link to="/browse" >
                <BottomNavigationItem
                  label="Browse"
                  icon={browseIcon}
                  onTouchTap={() => this.select(2)}
                />
                </Link>
              </BottomNavigation>
            </Paper>
          </div>
        </div>
      </Router>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
};

          //   <ul className="main-menu">
          //     <li className="menu-item">
          //         <i className="fa fa-picture-o" aria-hidden="true" />Collections
          //     </li>
          //     <li className="menu-item">
          //         <i className="fa fa-briefcase" aria-hidden="true" />Portfolio
          //     </li>
          //     <li className="menu-item">
          //         <i className="fa fa-wpexplorer" aria-hidden="true" />Browse
          //     </li>
          //   </ul>
export default App;
