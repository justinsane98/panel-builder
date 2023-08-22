import React, { useState } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import Konva from 'konva';
import { Container } from 'konva/lib/Container';

class Canvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            panelOffset: 10,
            currentFeature: null,
      }
    }
    
    componentDidMount = () => {
        console.log("hello world?")
    }

    panel = () => {
     return (
        <Layer>
            <Rect
                x={this.props.panelX}
                y={this.props.panelY}
                width={this.props.panelWidth}
                height={this.props.panelHeight}
                fill={this.props.panelColor}
                // onClick={handleClick}
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
    );
  }

  grid = () => {
    const grid = this.props.canvasWidth/25;
    const gridWidth = this.props.canvasWidth;
    const linesA = [];
    const linesB = [];
    
    for (let i = 0; i < gridWidth / grid; i++) {
        linesA.push(
            <Line
                key={"x" + i}
                strokeWidth={.25}
                stroke={"#ffffff"}
                points={[i * grid, 0, i * grid, gridWidth]}
            />
            );

        linesB.push(
        <Line
            key={"y" + i}
            strokeWidth={0.25}
            stroke={"#ffffff"}
            points={[0, i * grid, gridWidth, i * grid]}
        />
        );
    }

    return (
     <Layer>
        {linesA}
        {linesB}
      </Layer>
    )
  }


render() {
  return (
    
    <Stage width={this.props.canvasWidth} height={this.props.canvasHeight}>
        <Layer>
            <Rect 
                x={0}
                y={0}
                width={this.props.canvasWidth}
                height={this.props.canvasHeight}
                fill={this.props.canvasColor}
                cornerRadius={5}
            />
        </Layer>

        {this.panel()}
        {this.props.panelFeatures.map((panelFeature)=> (
            <Layer key={panelFeature.id}>
                {panelFeature.type === "circle" &&
                    <Circle
                        id={panelFeature.id}
                        radius={panelFeature.radius}
                        // fill={panelFeature.fill}
                        fill="red"
                        x={(this.props.canvasWidth - this.props.panelWidth)/2 + panelFeature.x}
                        y={(this.props.canvasWidth - this.props.panelWidth)/2 + panelFeature.y}
                        onDragStart={(e) => {
                            console.log(panelFeature)
                            this.setState({
                                currentFeature: panelFeature
                            })
                        }}
                        onDragEnd={(e) => {
                        let newX = Math.round(e.target.x() / (this.props.canvasWidth/25)) * (this.props.canvasWidth/25)
                        let newY = Math.round(e.target.y() / (this.props.canvasWidth/25)) * (this.props.canvasWidth/25)
                        
                        //console.log(newX, newY)

                        if(newX > (this.props.panelX + this.state.panelOffset) && newX < ((this.props.panelX + this.props.panelWidth) - this.state.panelOffset) &&
                            newY > (this.props.panelY + this.state.panelOffset) && newY < ((this.props.panelY + this.props.panelHeight) - this.state.panelOffset)
                          ) {
                            console.log("in range!")
                            // Move to nearest grid space
                            e.target.to({
                                x: newX,
                                y: newY
                            });
                            // SET X, Y on the feature
                        } else {
                            console.log("out of range!")
                            console.log(this.state.currentFeature)
                            // RESET
                            e.target.to({
                                x: this.state.currentFeature.x + this.props.panelX,
                                y: this.state.currentFeature.y + this.props.panelY 
                            });
                        }
                        }}
                        draggable={true}
                    >
                    </Circle>
                }
            </Layer>
        ))}
        {this.grid()}
    </Stage>
  )
}}

export default Canvas