import React, { Component } from "react";

// FIND A BETTER MASONRY GRID
// import MasonryLayout from "react-masonry-layout";
// import MasonryInfiniteScroller from "react-masonry-infinite";
// import * as Masonry from "react-masonry-component";
import MasonryGrid from "../MasonryGrid/MasonryGrid";

import Image from "./Image";

import "./Collections.css";

// import DBService from "../../Firebase/DBService";

class Collections extends Component {
  constructor(props) {
    super(props);

    // this.state = {

    //   images: []

    // };

    // this.dbService = new DBService();
  }

  handleScroll() {}

  render() {
    let imgs = [];
    this.props.images.forEach((img, i) => {
      // console.log(img);
      imgs.push(
        <Image
        //   style={{
        //     width: "236px",
        //     display: "block",
        //     height: `${i % 2 === 0 ? 4 * 50 : 50}px`

        //   }}
          key={img.key}
          img={img}
        />
      );
    });
    return (
      <div className="Collections">
        <MasonryGrid imgs={imgs} />
      </div>
    );
  }
}

export default Collections;
