import "@react-sigma/core/lib/style.css";
import './App.css'
import { SigmaContainer } from "@react-sigma/core";
import type { SerializedGraph } from "graphology-types";
import Graph from "graphology";
import { NodeImageProgram } from '@sigma/node-image';
import '@react-sigma/graph-search/lib/style.css';

const sigmaSettings = {
  allowInvalidContainer: true,
  nodeProgramClasses: { image: NodeImageProgram },
  defaultNodeType: 'image',
  defaultEdgeType: 'arrow',
  labelDensity: 0.07,
  labelGridCellSize: 60,
  // labelRenderedSizeThreshold: 15,
  renderEdgeLabels: true,
  labelFont: 'Lato, sans-serif',
  zIndex: true,
};

function App() {

  const graph: SerializedGraph = {
    attributes: {}, // opsiyonel genel graph özellikleri
    nodes: [
      {
        key: "n1",
        attributes: {
          label: "Node 1",
          x: 0,
          y: 0,
          size: 10,
          color: "#FF0000",
        }
      },
      {
        key: "n2",
        attributes: {
          label: "Node 2",
          x: 1,
          y: 1,
          size: 10,
          color: "#00FF00"
        }
      },
      {
        key: "n3",
        attributes:{
          label:"Node3",
          size:30,
          x:0,
          y:0.5,
          color:"orange",
          image:"/vite.svg"
        }
      }
    ],
    edges: [
      {
        key: "e1",
        source: "n1",
        target: "n2",
        attributes: {
          label: "Edge from n1 to n2"
        }
      },
      {
        key: "e2",
        source: "n3",
        target: "n2",
        attributes: {
          label: "Edge from n2 to n3"
        }
      }
    ],
    options: {} 
  }

  const graphMain=Graph.from(graph)

  graphMain.addNode("n4",{
    label: "Node 4",
    x: 0.5,
    y: 0,
    size: 20,
    color: "blue"
  })

  graphMain.addEdgeWithKey("e3", "n4", "n3", {label:"last relation"})

  return (
    <>
      <SigmaContainer settings={sigmaSettings} style={{width:800, height:500}} graph={graphMain}>

      </SigmaContainer>
    </>
  )
}

export default App
