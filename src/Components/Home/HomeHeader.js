import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import DBService from "../../Firebase/DBService";

class HomeHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      value: "Travel"
    };
    this.dbService = new DBService();
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    let menuItems = [];
    this.props.collections.forEach((collection) => {
      menuItems.push(<MenuItem key={collection.key} value={collection.value.title} primaryText={collection.value.title} />)
    });
    return (
      <div>
        <div>
          <h2>Beppe Karlsson</h2>
        </div>
        <div className={"collections-list"}>
          <SelectField value={this.state.value} onChange={this.handleChange}>
            {menuItems}
          </SelectField>
        </div>
      </div>
    );
  }
}

export default HomeHeader;