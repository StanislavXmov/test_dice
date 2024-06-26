import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Box, Line, Plane, useGLTF, useTexture } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody, CuboidCollider } from '@react-three/rapier';
import { Mesh, MeshStandardMaterial, Vector3 } from 'three';

import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Light } from '../../environment/Light';
import { useCoinPosition } from '../../state/useCoinPosition';
import { Coin as CoinType, useCoinValue } from '../../state/useCoinValue';
import { useRoleCoinButton } from '../../state/useRoleCoinButton';

const randomInteger = (min: number, max:number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const setRandomRotate = () => (randomInteger(0, 360) * Math.PI) / 180;
const setRotate = (n: number) => (n * Math.PI) / 180;

interface Model3d extends GLTF {
  nodes: any;
  materials: any;
}

const material = new MeshStandardMaterial({color: '#97dd7c', opacity: 0, transparent: true});
const material2 = new MeshStandardMaterial({color: '#f5f5f5', opacity: 1, transparent: true});
const material3 = new MeshStandardMaterial({color: '#c1c1c1', opacity: 1, transparent: true});

export const Coin = () => {
  const position = useCoinPosition(s => s.position);
  const setValue = useCoinValue(s => s.setValue);
  const isActive = useCoinValue(s => s.isActive);
  const setDisabled = useRoleCoinButton(s => s.setDisabled);

  const {nodes, materials} = useGLTF('./coin.glb') as unknown as Model3d;
  // const textureBg = useTexture('./bg.png');
  // // textureBg.minFilter = 1006;
  // const textureBg2 = useTexture('./bg2.png');
  // textureBg2.offset.x = -0.032;
  // textureBg2.minFilter = 1006;
  
  
  
  const body = useRef<RapierRigidBody>(null);

  const box1 = useRef<Mesh>(null);
  const box2 = useRef<Mesh>(null);

  const counter = useRef<number>(0);

  useFrame(() => {
    if (!isActive) {
      return;
    }
    if (body.current && body.current.nextTranslation().y < 0.06 && !body.current.isSleeping()) {
      counter.current = counter.current + 1;
      if (counter.current > 10) {
        const v1 = new Vector3();
        const v2 = new Vector3();

        body.current.sleep();
        counter.current = 0;

        box1.current.getWorldPosition(v1);
        box2.current.getWorldPosition(v2);

        let v: CoinType | null = null;

        if (v1.y > 0.15) {
          v = '5';
        } else if (v2.y > 0.15) {
          v = 'OREL';
        } else {
          v = '?';
        }
        if (v) {
          setValue(v);
          setDisabled(false);
        }
      }
    }
  });

  return (
    <>
      <Light />
      <Physics
        gravity={[0, -20, 0]}
        // debug
      >
        <CuboidCollider args={[9, 0.5, 9]} position={[0, -0.5, 0]} />
        {/* <Plane args={[10, 10]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} >
          <meshStandardMaterial map={textureBg} />
        </Plane> */}
        <RigidBody type='fixed'>
          <Box args={[8, 5, 1]} position={[0, 2.5, 5]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[8, 5, 1]} position={[0, 2.5, -3.5]} material={material2} />
          {/* <Box args={[10, 5, 1]} position={[0, 2.5, -3.5]} >
            <meshStandardMaterial map={textureBg2} />
          </Box> */}
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[1, 5, 8]} position={[4, 2.5, 0.5]} material={material} />
        </RigidBody>
        <RigidBody type='fixed'>
          <Box args={[1, 5, 8]} position={[-4, 2.5, 0.5]} material={material} />
        </RigidBody>
        <Line 
          points={[[-5.5, 0, -3], [5.5, 0, -3]]}       
          color="black"                   
          lineWidth={1}
        />
        <RigidBody
          ref={body}
          type='dynamic'
          // type='fixed'
          position={position}
          // position={[0, 2, 0]}
          // rotation={[setRandomRotate(), setRandomRotate(), setRandomRotate()]}
          rotation={[Math.PI / 2, setRandomRotate(), setRandomRotate()]}
          // linearVelocity={[0,-10,0]}
          angularVelocity={[15,0,0]}
          colliders="trimesh"
          mass={500}
        >
          <group>
            <mesh 
              castShadow 
              receiveShadow 
              geometry={nodes['Circle'].geometry} 
              material={materials['Material.001']} 
            />
            <Box args={[0.1, 0.1, 0.1]} ref={box1} position={[0, -0.1, 0]} visible={false} />
            <Box args={[0.1, 0.1, 0.1]} ref={box2} position={[0, 0.1, 0]} visible={false} />
            
          </group>
        </RigidBody>
      </Physics>
    </>
  );
}