import React, { Component } from "react";
import "./MasonryGrid.css";

const width = window.innerWidth > 400 ? 420: 300;

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
    rows = Math.floor(this.state.width / width);
    return rows;
  };

  assignImgsToRows() {
    let numOfRows = this.calculateRows();
    let rows = [];
    let index;
    for (index = 0; index < numOfRows; index += 1) {
      rows.push({ key: index, imgs: [] });
    }
    let {imgs} = this.props;
    let rowLength = imgs.length / numOfRows;
    let currentRow = 0;
    if (rows.length > 0) {
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
        <div key={row.key} style={{width: width}} className={`grid-row row-${row.key}`}>
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
