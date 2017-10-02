import React, {Component} from 'react';
import {connect} from "react-redux";
import IconButton from 'material-ui/IconButton';
import * as imageActions from '../../actions/imageActions';

import './FullscreenImage.css';

class FullscreenImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false
    }
  }


  closeFullscreen = () => {
    this.props.closeFullscreen();
  }

  clickOutside = (e) => {
    this.props.closeFullscreen();
  }

  showInfo = (e) => {
    e.stopPropagation();
    let {value} = this.props.img;
    this.setState({showOverlay: !this.state.showOverlay});
  }

  render() {
    let {img} = this.props;
    let iconStyle = {
      color: "#CC0000"
    }

    let overlayStatus = this.state.showOverlay ? "display" : "hidden";
    return (
      <div onClick={this.clickOutside} className="fullscreen-image">
        <div className="fullscreen-image-topbar">
          <h2 className="image-title">{img.value.title}</h2>
          <IconButton 
            onClick={this.closeFullscreen}
            iconStyle={iconStyle} 
            className="close-button" 
            iconClassName="fa fa-times"
          />
        </div>
        <div className="fullscreen-image-background">
          <div className="fullscreen-image-container">
            <img 
              src={img.value.path.downloadURL}
            />
            <IconButton 
              onClick={this.showInfo}
              iconStyle={iconStyle} 
              className="info-button" 
              iconClassName="fa fa-info"
            />
            
            <div className={`fullscreen-image-overlay fullscreen-image-overlay-${overlayStatus}`}>
              <p>{img.value.description}</p>
            </div>
          </div>
        </div>
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