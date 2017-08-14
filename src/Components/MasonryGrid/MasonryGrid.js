import React, { Component } from "react";
import "./MasonryGrid.css";

class MasonryGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { width: "0", height: "0" };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  calculateRows = () => {
    let rows;
    // if (this.state.width > 1000) {
    //   rows = 4;
    // } else if (this.state.width > 800) {
    //   rows = 3;
    // } else {
    //   rows = 2;
    // }
    rows = Math.floor(this.state.width / 260);
    console.log(rows);
    return rows;
  };

  assignImgsToRows() {
    let numOfRows = this.calculateRows();
    let rows = [];
    let index;
    for (index = 0; index < numOfRows; index += 1) {
      rows.push({ key: index, imgs: [] });
    }
    let imgs = this.props.imgs;
    let rowLength = imgs.length / numOfRows;
    let currentRow = 0;
    if (imgs.length > 0) {
      imgs.map((img, i) => {
        rows[currentRow].imgs.push(img);
        if (i + 1 - currentRow * rowLength >= rowLength) {
          currentRow += 1;
        }
      });
    }
    return rows;
  }

  render() {
    let rows = this.assignImgsToRows();
    let grid = [];
    rows.forEach(row => {
      grid.push(
        <div key={row.key} style={{width: this.state.width / rows.length}} className={`grid-row row-${row.key}`}>
          {row.imgs}
        </div>
      );
    });

    return (
      <div className={"collection-grid"}>
        {grid}
      </div>
    );
  }
}

export default MasonryGrid;
