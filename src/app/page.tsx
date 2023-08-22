'use client'
import * as React from "react"
import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('../components/canvas'), {
  ssr: false,
});

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      canvasColor: "#abcdef",
      canvasWidth: 800,
      canvasHeight: 600,
      panelWidth: 500,
      panelHeight: 300,
      panelX: 0,
      panellY: 0,
      materials: [
        {name: "Matte Black", color: "#000000"},
        {name: "Matte White", color: "#ffffff"},
        {name: "Black Carbon Fiber", color: "#111111"},
        {name: "White Carbon Fiber", color: "#eeeeee"},
        {name: "Brushed Silver", color: "#cccccc"},
        {name: "Brushed Ebony", color: "#666666"}
      ],
      materialsOpen: false,
      selectedMaterial: {name: "Matte Black", color: "#000000"},
      selectedFeatures: []
    }
  }

  componentDidMount = () => {
    this.setState({
      panelX: (this.state.canvasWidth - this.state.panelWidth)/2,
      panelY: (this.state.canvasHeight - this.state.panelHeight)/2,
      selectedFeatures: [
        {
          id:"feature1",
          type: "circle",
          radius: 10,
          fill: this.state.canvasColor,
          x: 105,
          y: 105,
        },
        {
          id:"feature2",
          type: "circle",
          radius: 10,
          fill: this.state.canvasColor,
          x: 75,
          y: 75,
        },
        {
          id:"feature3",
          type: "circle",
          radius: 10,
          fill: this.state.canvasColor,
          x: 40,
          y: 40,
        }
      ]
    })
  }

  panelWidthChange = (width: any) => {
    if(Number.isInteger(parseInt(width))) {
      this.setState({panelWidth: width})
      console.log("valid")
    } else {
      this.setState({panelWidth: ""})
    }
  }
  panelHeightChange = (height: any) => {
    if(Number.isInteger(parseInt(height))) {
      this.setState({panelHeight: height})
      console.log("valid")
    } else {
      this.setState({panelHeight: ""})
    }
  }

  selectMaterial = (name: string, color: string) => {
    console.log(name)
    this.setState({
      selectedMaterial: {
        name: name,
        color: color
      },
      materialsOpen: false
    })
  }
  toggleMaterials = () => {
    console.log(this.state.materialsOpen)

    if(this.state.materialsOpen) {
      this.setState({
        materialsOpen: false
      })
    } else {
      this.setState({
        materialsOpen: true
      })
    }
  }

  render() { 
    return (
    <main className="min-h-screen 1024px:flex items-start justify-start p-4 gap-2">
      <div className="grid text-left w-full">
        <h1 className="font-bold text-3xl mb-4">Panel Builder</h1>
        <div className="flex flex-col gap-2 mb-4 1024px:mb-0">
            <div>
              <div className="">Height <span className="text-xs">(mm)</span></div>
              <input type="text" className="block border border-black w-full px-2 py-1 rounded" placeholder="" value={this.state.panelHeight} onFocus={(e) => e.target.select()} onChange={(e) => this.panelHeightChange(e.target.value)}/>
            </div>
            <div>
              <div className="">Width <span className="text-xs">(mm)</span></div>
              <input type="text" className="block border border-black w-full px-2 py-1 rounded" placeholder="" value={this.state.panelWidth} onFocus={(e) => e.target.select()} onChange={(e) => this.panelWidthChange(e.target.value)}/>
            </div>
            <div>
              <div className="">Material <span className="text-xs">(color)</span></div>
              {/* <input type="text" className="block border border-black w-full px-2 py-1 rounded" placeholder="" value={this.state.panelWidth} onFocus={(e) => e.target.select()} onChange={(e) => this.panelWidthChange(e.target.value)}/> */}
              <div className="relative">
                <a onClick={this.toggleMaterials} className="flex border border-black w-full px-2 py-1 rounded items-center hover:cursor-pointer">
                  <div>
                    <div className="w-5 h-5 mr-2 rounded" style={{
                      backgroundColor: this.state.selectedMaterial.color
                    }}></div>
                  </div>
                  <div className="flex-1">{this.state.selectedMaterial.name}</div>
                </a>
                {this.state.materialsOpen &&
                  <div className={`border border-black w-full rounded absolute top-8 border-t-0 rounded-t-none transition-all duration-500 ease py-1 overflow-hidden ${this.state.materialsOpen ? "max-h-72" : "max-h-0"}`}>
                    {this.state.materials.map((material) => (
                      <a key={material.name} onClick={(e) => this.selectMaterial(material.name, material.color)} className="flex px-2 py-1 items-center hover:cursor-pointer hover:bg-[#efefef]">
                        <div className="w-5 h-5 mr-2 rounded" style={{
                          backgroundColor: material.color
                        }}></div>
                        <div>{material.name}</div>
                      </a>
                    ))}
                  </div>
                  }
              </div>
            </div>
        </div>
       
      </div>

      <div className="w-full">
        <div className="text-left border border-black rounded inline-block">
          <Canvas 
            canvasWidth={this.state.canvasWidth}
            canvasHeight={this.state.canvasHeight}
            canvasColor={this.state.canvasColor}
            panelWidth={this.state.panelWidth}
            panelHeight={this.state.panelHeight}
            panelX={this.state.panelX}
            panelY={this.state.panelY}
            panelColor={this.state.selectedMaterial.color}
            panelFeatures={this.state.selectedFeatures}
          />
        </div>
      </div>
    </main>
  )
}}

export default Home
