import React, { Component } from 'react';

import "./Image.css";

class Image extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false
    };
  }

  render() {
    let img = this.props.img;
    return (
      <div className={"list-image-container"}>
        <img
          alt={img.value.title}
          src={img.value.path.smallURL}

        />
      </div>
    );
  }
}

export default Image;