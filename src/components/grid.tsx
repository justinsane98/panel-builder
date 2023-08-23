import React, { useState } from 'react';
import { Layer, Line } from 'react-konva';

class Grid extends React.Component <any, any> {
    constructor(props:any) {
        super(props)
        this.state = {
      }
    }
    
    componentDidMount = () => {

    }


render() {
    const grid = this.props.canvasWidth/this.props.gridSpacing;
    const gridWidth = this.props.canvasWidth;

  return (
    <Layer>
        {[...Array(gridWidth / grid)].map((x, i) =>
            <Line
                key={"x" + i}
                strokeWidth={.25}
                stroke={"#ffffff"}
                points={[i * grid, 0, i * grid, gridWidth]}
            />
        )}
        {[...Array(gridWidth / grid)].map((x, i) =>
            <Line
                key={"y" + i}
                strokeWidth={0.25}
                stroke={"#ffffff"}
                points={[0, i * grid, gridWidth, i * grid]}
            />
        )}
    </Layer>
  )
}}

export default Grid