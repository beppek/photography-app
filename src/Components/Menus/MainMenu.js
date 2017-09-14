import React, {Component} from 'react';
import {
  Link
} from "react-router-dom";

class MainMenu extends Component {
  render() {
    return (
      <div className="menu-container">
        <ul className="main-menu">
          <li className="menu-item">
            <Link to="/collections">
              <i className="fa fa-picture-o" aria-hidden="true"/>
              Collections
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/portfolio">
              <i className="fa fa-briefcase" aria-hidden="true"/>Portfolio
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/browse">
              <i className="fa fa-wpexplorer" aria-hidden="true"/>Browse
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default MainMenu;