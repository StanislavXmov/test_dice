import { Canvas, useFrame } from '@react-three/fiber';
import styles from './App.module.scss';
import { Suspense, useRef, useState } from 'react';
import { Box, Line, OrbitControls, Plane, useGLTF, OrthographicCamera } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { Light } from './environment/Light';
import { Euler, Mesh, MeshStandardMaterial, Quaternion, Vector3 } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { usePosition } from './state/usePosition';
import { useValue } from './state/useValue';

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
  const setValue = useValue(s => s.setValue);

  const {nodes, materials} = useGLTF('./dice.glb') as unknown as Model3d;
  const body = useRef<RapierRigidBody>(null);

  const box1 = useRef<Mesh>(null);
  const box2 = useRef<Mesh>(null);
  const box3 = useRef<Mesh>(null);
  const box4 = useRef<Mesh>(null);
  const box5 = useRef<Mesh>(null);
  const box6 = useRef<Mesh>(null);

  const counter = useRef<number>(0);

  useFrame(() => {
    if (body.current && body.current.nextTranslation().y < 0.5 && !body.current.isSleeping()) {
      counter.current = counter.current + 1;
      if (counter.current > 10) {
        const v1 = new Vector3();
        const v2 = new Vector3();
        const v3 = new Vector3();
        const v4 = new Vector3();
        const v5 = new Vector3();
        const v6 = new Vector3();

        body.current.sleep();
        counter.current = 0;

        box1.current.getWorldPosition(v1);
        box2.current.getWorldPosition(v2);
        box3.current.getWorldPosition(v3);
        box4.current.getWorldPosition(v4);
        box5.current.getWorldPosition(v5);
        box6.current.getWorldPosition(v6);

        if (v1.y > 1) {
          setValue('1');
        } else if (v2.y > 1) {
          setValue('2');
        } else if (v3.y > 1) {
          setValue('3');
        } else if (v4.y > 1) {
          setValue('4');
        } else if (v5.y > 1) {
          setValue('5');
        } else if (v6.y > 1) {
          setValue('6');
        } else {
          setValue('?');
        }
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
          colliders="cuboid"
          mass={100}
        >
          <group>
            <mesh 
              castShadow 
              receiveShadow 
              geometry={nodes['Cube'].geometry} 
              material={materials['Material']} 
            />
            <Box args={[0.1, 0.1, 0.1]} ref={box1} position={[-0.55, 0, 0]} visible={false} />
            <Box args={[0.1, 0.1, 0.1]} ref={box2} position={[0, -0.55, 0]} visible={false} />
            <Box args={[0.1, 0.1, 0.1]} ref={box3} position={[0, 0, -0.55]} visible={false} />
            <Box args={[0.1, 0.1, 0.1]} ref={box4} position={[0, 0, 0.55]} visible={false} />
            <Box args={[0.1, 0.1, 0.1]} ref={box5} position={[0, 0.55, 0]} visible={false} />
            <Box args={[0.1, 0.1, 0.1]} ref={box6} position={[0.55, 0, 0]} visible={false} />
          </group>
        </RigidBody>
      </Physics>
    </>
  );
}

const ValueElement = () => {
  const value = useValue(s => s.value);

  return (
    <button
      className={styles.button}
    >
      {value}
    </button>
  );
}


function App() {  

  const setPosition = usePosition(s => s.setPosition);
  const setValue = useValue(s => s.setValue);

  return (
    <div className={styles.app}>
      <Canvas
        shadows
        // camera={{ fov: 75, position: [0, 3, 3]}}
        camera={{ fov: 75, position: [0, 20, 20], zoom: 50}}
        orthographic
      >
        <OrbitControls />
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
      <div className={styles.buttonsWrapper}>
        <button
          className={styles.button}
          onClick={() => {
            setPosition(new Vector3(0, 5, 0));
            setValue('?');
          }}
        >
          ROLE
        </button>
        <ValueElement />
      </div>
    </div>
  );
}

export default App;
