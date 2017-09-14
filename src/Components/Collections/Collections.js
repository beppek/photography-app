import React, {Component} from "react";
import {connect} from "react-redux";

import MasonryGrid from "../MasonryGrid/MasonryGrid";

import Image from "./Image";
import FullscreenImage from './FullscreenImage';

import "./Collections.css";

class Collections extends Component {

  handleScroll() {}

  render() {
    let imgs = [];
    let {images, fullscreenImage} = this.props;
    images.forEach((img, i) => {
      imgs.push(<Image key={img.key} img={img}/>);
    });
    return (
      <div className="Collections">
        {!fullscreenImage
          ? <MasonryGrid imgs={imgs}/>
          : <FullscreenImage img={fullscreenImage}/>
}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.images.images, 
    collections: state.collections.collections,
    fullscreenImage: state.images.fullscreenImage
  }
}

export default connect(mapStateToProps)(Collections);
