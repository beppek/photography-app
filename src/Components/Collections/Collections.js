import React, {Component} from "react";
import {connect} from "react-redux";

import { CSSTransitionGroup } from 'react-transition-group';

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
        <CSSTransitionGroup 
          transitionName="example"
          transitionLeaveTimeout={500}
          transitionEnter={false}
        >
          <MasonryGrid key={1} imgs={imgs}/>
          {fullscreenImage &&
            <CSSTransitionGroup 
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionLeaveTimeout={500}
            >
            <FullscreenImage key={2} img={fullscreenImage}/>
        </CSSTransitionGroup>
          }
        </CSSTransitionGroup>
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
