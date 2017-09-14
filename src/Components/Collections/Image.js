import React, {Component} from 'react';
import {connect} from "react-redux";
import * as imageActions from '../../actions/imageActions';

import "./Image.css";

const width = window.innerWidth > 400 ? 410: 290;

class Image extends Component {

  toggleFullscreen = () => {
    this
      .props
      .viewInFullscreen(this.props.img);
  }

  render() {
    let img = this.props.img;
    let style = {
      width: width
    };
    return (
      <div onClick={this.toggleFullscreen} className={"list-image-container"}>
        <img
          alt={img.value.title}
          src={img.value.path.smallURL}
          style={style}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewInFullscreen: (image) => {
      dispatch(imageActions.viewInFullscreen(image, dispatch));
    }
  }
}

export default connect(null, mapDispatchToProps)(Image);