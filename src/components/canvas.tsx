import React, { useState } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import Grid from './grid';
import Panel from './panel';

class Canvas extends React.Component <any, any> {
    constructor(props:any) {
        super(props)
        this.state = {
            panelOffset: 10,
            currentFeature: null,
      }
    }
    
    componentDidMount = () => {

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

        <Panel {...this.props} />
        {this.props.panelFeatures.map((panelFeature: any)=> (
            <Layer key={panelFeature.id}>
                {panelFeature.type === "circle" &&
                    <Circle
                        id={panelFeature.id}
                        radius={panelFeature.radius}
                        fill={panelFeature.fill}
                        x={(this.props.canvasWidth - this.props.panelWidth)/2 + panelFeature.x}
                        y={(this.props.canvasWidth - this.props.panelWidth)/2 + panelFeature.y}
                        onDragStart={(e) => {
                            console.log(panelFeature)
                            this.setState({
                                currentFeature: panelFeature
                            })
                        }}
                        onDragEnd={(e) => {
                        let newX = Math.round(e.target.x() / (this.props.canvasWidth/this.props.gridSpacing)) * (this.props.canvasWidth/this.props.gridSpacing)
                        let newY = Math.round(e.target.y() / (this.props.canvasWidth/this.props.gridSpacing)) * (this.props.canvasWidth/this.props.gridSpacing)
                        
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
                            panelFeature.x = newX - this.props.panelX
                            panelFeature.y = newY - this.props.panelY
                            this.props.updateFeature(panelFeature)
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
        <Grid {...this.props}/>
    </Stage>
  )
}}

export default Canvas