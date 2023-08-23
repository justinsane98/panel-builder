import React, { useState } from 'react';
import { Layer, Rect } from 'react-konva';

class Panel extends React.Component <any, any> {
    constructor(props:any) {
        super(props)
        this.state = {
      }
    }
    
    componentDidMount = () => {

    }


render() {
  return (
    <Layer>
        <Rect
            x={this.props.panelX}
            y={this.props.panelY}
            width={this.props.panelWidth}
            height={this.props.panelHeight}
            fill={this.props.panelColor}
            draggable={true}
            onDragStart={(e) => {
            }}
            onDragEnd={(e) => {
              // check for boundaries
              // then move it...
              // update parent with new X, Y so the features can update
              let newX = Math.round(e.target.x() / (this.props.canvasWidth/this.props.gridSpacing)) * (this.props.canvasWidth/this.props.gridSpacing)
              let newY = Math.round(e.target.y() / (this.props.canvasWidth/this.props.gridSpacing)) * (this.props.canvasWidth/this.props.gridSpacing)
                e.target.to({
                    x: newX,
                    y: newY
                });

            }}
            cornerRadius={5}
            classNames="hover:cursor-pointer"
            shadowEnabled={true}
            shadowColor="#000000"
            shadowBlur={8}
            shadowOffsetX={2}
            shadowOffsetY={2}
            shadowOpacity={0.25}
            stroke="#eeeeee"
            strokeWidth={1}
        />
    </Layer>
  )
}}

export default Panel