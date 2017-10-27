import React, {Component} from 'react';
import {connect} from "react-redux";
import IconButton from 'material-ui/IconButton';
import * as imageActions from '../../actions/imageActions';

import './FullscreenImage.css';
import loader from "./Eclipse.gif";

class FullscreenImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
      loaded: false
    }
  }

  closeFullscreen = () => {
    this.setState({loaded: false, showOverlay: false});
    this.props.closeFullscreen();
  }

  showInfo = (e) => {
    e.stopPropagation();
    let {value} = this.props.img;
    this.setState({showOverlay: !this.state.showOverlay});
  }

  render() {
    let {loaded, showOverlay} = this.state;
    let {img, open} = this.props;
    let iconStyle = {
      color: "#CC0000"
    }

    // Placeholder info if img is null to prevent render error
    if (!img) {
      img = {
        value: {
          title: "",
          path: {
            downloadURL: ""
          },
          description: ""
        }
      }
    }

    let overlayStatus = showOverlay ? "display" : "hidden";
    let openStatus = open ? "open" : "closed";

    let styles = {
      visibility: loaded ? "visible" : "hidden"
    };

    return (
      <div onClick={this.closeFullscreen} className={`fullscreen-image fullscreen-image-${openStatus}`}>
        <div className={`fullscreen-image-topbar fullscreen-image-topbar-${openStatus}`}>
          <h2 className="image-title">{img.value.title}</h2>
          <IconButton 
            onClick={this.closeFullscreen}
            iconStyle={iconStyle} 
            className="close-button" 
            iconClassName="fa fa-times"
          />
        </div>
        <div className={`fullscreen-image-background fullscreen-image-background-${openStatus}`}>
          <div className={`fullscreen-image-container`}>
            <img 
              style={styles}
              onLoad={() => this.setState({loaded:true})}
              src={img.value.path.downloadURL}
            />
            {!loaded && open &&
            <img className="loader" src={loader} />}
            {loaded &&
            <IconButton 
              onClick={this.showInfo}
              iconStyle={iconStyle} 
              className="info-button" 
              iconClassName="fa fa-info"
            />}
            
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