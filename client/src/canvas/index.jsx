import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Center, Preload } from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

import state from '../store';

const CanvasModel = () => {
  return (
    <>
    {state.isDesktop && state.isHeight &&
      <Canvas  shadows camera={{fov: 8, near: 0.1,far: 200,position: state.anglePosition}} gl={{ preserveDrawingBuffer: true }} className="w-full max-w-full h-full transition-all ease-in" >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      {/* <CameraRig> */}
        {/* <Backdrop /> */}
         
          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2}/>
           <Shirt />
          <Preload all />
        
      {/* </CameraRig> */}
    </Canvas>}
    {!state.isHeight &&
      <Canvas  shadows camera={{fov: 8, near: 0.1,far: 200,position: state.anglePosition}} gl={{ preserveDrawingBuffer: true }} className="w-full max-w-full h-full transition-all ease-in" >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      {/* <CameraRig> */}
        {/* <Backdrop /> */}
         
          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2}/>
           <Shirt />
          <Preload all />
        
      {/* </CameraRig> */}
    </Canvas>}
    {state.isHeight && state.mobileView &&
      <Canvas  shadows camera={{fov: 9, near: 0.1,far: 200,position: state.anglePosition}} gl={{ preserveDrawingBuffer: true }} className="w-full max-w-full h-full transition-all ease-in" >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      {/* <CameraRig> */}
        {/* <Backdrop /> */}
         
          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2}/>
           <Shirt />
          <Preload all />
        
      {/* </CameraRig> */}
    </Canvas>
    }
    {state.isTablet && !state.isDesktop && !state.mobileView &&
      <Canvas  shadows camera={{fov: 8, near: 0.1,far: 200,position: state.anglePosition}} gl={{ preserveDrawingBuffer: true }} className="w-full max-w-full h-full transition-all ease-in" >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      {/* <CameraRig> */}
        {/* <Backdrop /> */}
         
          <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2}/>
           <Shirt />
          <Preload all />
        
      {/* </CameraRig> */}
    </Canvas>
    }
    </>
  )
}

export default CanvasModel