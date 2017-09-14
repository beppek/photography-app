import React, {Component} from 'react';
import {connect} from "react-redux";
import IconButton from 'material-ui/IconButton';
import * as imageActions from '../../actions/imageActions';

import './FullscreenImage.css';

class FullscreenImage extends Component {

  closeFullscreen = () => {
    this.props.closeFullscreen();
  }

  clickOutside = (e) => {
    this.props.closeFullscreen();
  }

  render() {
    let {img} = this.props;
    let iconStyle = {
      color: "#CC0000"
    }
    return (
      <div onClick={this.clickOutside} className="fullscreen-image-container">
        <div className="fullscreen-image-topbar">
          <h2 className="image-title">{img.value.title}</h2>
          <IconButton 
            onClick={this.closeFullscreen}
            iconStyle={iconStyle} 
            className="close-button" 
            iconClassName="fa fa-times"
          />
        </div>
        <img 
          src={img.value.path.downloadURL}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeFullscreen: (image) => {
      dispatch(imageActions.closeFullscreen(dispatch));
    }
  }
}

export default connect(null, mapDispatchToProps)(FullscreenImage);