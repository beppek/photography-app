import React, {Component} from "react";
import "./MasonryGrid.css";

const width = window.innerWidth > 400
  ? 380
  : 300;

class MasonryGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "0",
      height: "0"
    };
    this.updateWindowDimensions = this
      .updateWindowDimensions
      .bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  calculateCols = () => {
    let cols;
    cols = Math.floor(this.state.width / width);
    return cols;
  };

  /**
   * Assigns images to cols in a masonry fashion, evenly distributed over the columns
   */
  assignImgsToCols() {
    let numOfCols = this.calculateCols();
    
    // Init cols
    let cols = [];
    let i;
    for (i = 0; i < numOfCols; i += 1) {
      cols.push({key: i, imgs: []});
    }

    let {imgs} = this.props;
    
    // Init colHeights
    let colHeights = [];
    for (i = 0; i < cols.length; i+=1) {
      colHeights[i] = 0;
    };

    // Add image to shortest column
    if (cols.length > 0) {
      imgs.forEach((img) => {
        let col = this.findShortestColumn(colHeights);
        cols[col].imgs.push(img);
        let {dimensions} = img.props.img.value;
        colHeights[col] += dimensions.small.maxHeight;
      });
    }
    
    return cols;
  }

  /**
   * Finds the shortest column in the grid
   * @param {Array} cols
   * @return {int} col - shortest column 
   */
  findShortestColumn(cols) {
    let min = cols[0];
    let index = 0;
    let i;
    for (i = 0; i < cols.length; i+=1) {
      if (cols[i] < min) {
        min = cols[i];
        index = i;
      }
    }
    return index;
  }

  render() {
    let rows = this.assignImgsToCols();
    let grid = [];
    rows.forEach(row => {
      grid.push(
        <div
          key={row.key}
          style={{
          width: width
        }}
          className={`grid-row row-${row.key}`}>
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
