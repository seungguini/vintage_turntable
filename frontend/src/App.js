import "./App.css"
import ReactDOM from "react-dom"
import React, { useRef, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"

/** ThreeJS */
import Lights from "./components/Lights"
// Load turntable 3D model
import Turntable from "./components/Turntable"

// Component Imports
import Login from "./Login"
import Dashboard from "./Dashboard"

import "bootstrap/dist/css/bootstrap.min.css"

// Grab Spotify Auth code from the URL
const code = new URLSearchParams(window.location.search).get("code")

const App = () => {
  return (
    <div className="App">
      <Canvas className="canvas">
        <Lights />
        <Suspense fallback={null}>
          <Turntable />
          <Environment preset="apartment" background />
        </Suspense>
      </Canvas>
      {code ? (
        <Dashboard className="dashboard" code={code} />
      ) : (
        <Login className="login" />
      )}
    </div>
  )
}

export default App
