import React from "react"

const Lights = () => {
  return (
    <>
      <fog attach="fog" args={["#fff", 0, 22]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  )
}

export default Lights
