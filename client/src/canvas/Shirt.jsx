import React, {useState, useEffect} from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {

    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

    const stateString = JSON.stringify(snap);

    return (
        <>
        {/* desktop view */}
        { state.isHeight && state.isDesktop &&
            <group key={stateString} position ={state.groupPosition} >
                <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} dispose={null} >
                {snap.isFullTexture && (
                    <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
                )}
                {snap.isLogoTexture && (
                    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={logoTexture} map-anisotropy={16} depthTest={false} depthWrite={true} />
                )}
                {snap.isBackTexture && (
                    <Decal position={[0, -0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={logoTexture} map-anisotropy={16} depthTest={false} depthWrite={true} />
                )}
            </mesh>
            </group>
        }
        {/* mobile mini version */}
        {!state.isHeight &&
            <group key={stateString} position ={state.groupPosition} >
            {state.hideInHome &&
                <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} dispose={null} >
                {snap.isFullTexture && (
                    <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
                )}
                {snap.isLogoTexture && (
                    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={logoTexture} map-anisotropy={16} depthTest={false} depthWrite={true} />
                )}
            </mesh>
            }
            </group>
        }
        {/* mobile big version */}
        {state.isHeight && state.mobileView && !state.isTablet &&
            <group key={stateString} position ={state.bigMobile} >
                <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} dispose={null} >
                {snap.isFullTexture && (
                    <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
                )}
                {snap.isLogoTexture && (
                    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={logoTexture} map-anisotropy={16} depthTest={false} depthWrite={true} />
                )}
            </mesh>
            </group>
        }
        {/* tablet version */}
        {state.isTablet && !state.isDesktop && !state.mobileView &&
            <group key={stateString} position ={state.tabPosition} >
                <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} dispose={null} >
                {snap.isFullTexture && (
                    <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
                )}
                {snap.isLogoTexture && (
                    <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={logoTexture} map-anisotropy={16} depthTest={false} depthWrite={true} />
                )}
            </mesh>
            </group>
        }
        </>
    )
}

export default Shirt