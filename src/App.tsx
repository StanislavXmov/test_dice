import { Canvas, useFrame } from '@react-three/fiber';
import styles from './App.module.scss';
import { Suspense, useRef, useState } from 'react';
import { Box, Line, OrbitControls, Plane, useGLTF } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { Light } from './environment/Light';
import { MeshStandardMaterial, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { usePosition } from './state/usePosition';

const randomInteger = (min: number, max:number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const setRandomRotate = () => (randomInteger(0, 360) * Math.PI) / 180;


interface Model3d extends GLTF {
  nodes: any;
  materials: any;
}

const material = new MeshStandardMaterial({color: '#97dd7c', opacity: 0, transparent: true});

const Scene = () => {
  const position = usePosition(s => s.position);
  const {nodes, materials} = useGLTF('./dice.glb') as unknown as Model3d;
  const body = useRef<RapierRigidBody>(null);
  const counter = useRef<number>(0);

  useFrame(() => {
    if (body.current && body.current.nextTranslation().y < 0.5 && !body.current.isSleeping()) {
      counter.current = counter.current + 1;
      if (counter.current > 10) {
        console.log(body.current.nextTranslation());
        body.current.sleep();
        counter.current = 0;
      }
    }
  });

  return (
    <>
      <Light />
      {/* <gridHelper /> */}
      <Physics
      // debug
      >
        <RigidBody type='fixed'>
          <Plane args={[8, 8]} rotation={[-Math.PI / 2, 0, 0]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[6, 5, 1]} position={[0, 2.5, 3]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[8, 5, 1]} position={[0, 2.5, -3.5]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[1, 5, 6.5]} position={[3, 2.5, 0]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[1, 5, 6.5]} position={[-3, 2.5, 0]} material={material} />
        </RigidBody>
        <Line 
          points={[[-2.5, 0, -3], [2.5, 0, -3]]}       
          color="black"                   
          lineWidth={1}
        />
        <Line 
          points={[[-2.5, 0, -3], [-2.5, 4, -3]]}       
          color="black"                   
          lineWidth={1}
        />
        <Line 
          points={[[2.5, 0, -3], [2.5, 4, -3]]}       
          color="black"                   
          lineWidth={1}
        />
        <Line 
          points={[[-2.5, 0, -3], [-2.5, 0, 3]]}       
          color="black"                   
          lineWidth={1}
        />
        <Line 
          points={[[2.5, 0, -3], [2.5, 0, 3]]}       
          color="black"                   
          lineWidth={1}
        />
        <RigidBody
          ref={body}
          type='dynamic'
          position={position}
          rotation={[setRandomRotate(), setRandomRotate(), setRandomRotate()]}
          linearVelocity={[0,-10,0]}
          angularVelocity={[0,10,0]}
          colliders="trimesh"
          mass={100}
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
        // camera={{ fov: 75, position: [0, 3, 3]}}
        camera={{ fov: 75, position: [0, 4, 1]}}
      >
        {/* <OrbitControls /> */}
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
