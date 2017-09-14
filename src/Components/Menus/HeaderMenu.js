import React, {Component} from 'react';
import {
  Route
} from "react-router-dom";

import CollectionsHeader from '../Collections/CollectionsHeader';
import PortfolioHeader from '../Portfolio/PortfolioHeader';
import BrowseHeader from '../Browse/BrowseHeader';
import HomeHeader from '../Home/HomeHeader';

class HeaderMenu extends Component {
  render() {
    return (
      <div className="page-menu">
        <Route
          path="/collections"
          component={() => <CollectionsHeader collections={this.props.collections}/>}/>
        <Route
          path="/home"
          component={() => <HomeHeader collections={this.props.collections}/>}/>
        <Route path="/portfolio" component={PortfolioHeader}/>
        <Route path="/browse" component={BrowseHeader}/>
      </div>
    );
  }
}

export default HeaderMenu;