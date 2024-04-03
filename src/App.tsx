import { Canvas } from '@react-three/fiber';
import styles from './App.module.scss';
import { Suspense, useRef, useState } from 'react';
import { Box, OrbitControls, Plane, useGLTF } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { Light } from './environment/Light';
import { MeshStandardMaterial, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { usePosition } from './state/usePosition';

const setRandomRotate = () => Math.PI / (Math.random() * 4) ;

interface Model3d extends GLTF {
  nodes: any;
  materials: any;
}

const material = new MeshStandardMaterial({color: '#97dd7c', opacity: 0, transparent: true});

const Scene = () => {
  const position = usePosition(s => s.position);
  const {nodes, materials} = useGLTF('./dice.glb') as unknown as Model3d;
  const body = useRef<RapierRigidBody>(null);

  return (
    <>
      <Light />
      {/* <gridHelper /> */}
      <Physics>
        <RigidBody type='fixed'>
          <Plane args={[4, 4]} rotation={[-Math.PI / 2, 0, 0]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[4, 5, 1]} position={[0, 2.5, 2.5]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[4, 5, 1]} position={[0, 2.5, -2.5]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[1, 5, 6]} position={[2.5, 2.5, 0]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[1, 5, 6]} position={[-2.5, 2.5, 0]} material={material} />
        </RigidBody>
        <RigidBody
          ref={body}
          type='dynamic'
          position={position}
          rotation={[setRandomRotate(), setRandomRotate(), setRandomRotate()]}
          linearVelocity={[0,-10,0]}
          angularVelocity={[0,2,0]}
          colliders="trimesh"
        >
          <mesh 
            castShadow 
            receiveShadow 
            geometry={nodes['Cube'].geometry} 
            material={materials['Material']} 
        />
        </RigidBody>
      </Physics>
    </>
  );
}


function App() {
  
  const setPosition = usePosition(s => s.setPosition);
  
  return (
    <div className={styles.app}>
      <Canvas
        shadows
        camera={{ fov: 75, position: [-1, 3, 3]}}
      >
        <OrbitControls />
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
      <div className={styles.buttonsWrapper}>
        <button
          className={styles.button}
          onClick={() => setPosition(new Vector3(0, 5, 0))}
        >
          ROLE
        </button>
      </div>
     
    </div>
  );
}

export default App;
