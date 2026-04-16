/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

import cardGLB from './card.glb';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  
  // --- CUSTOM TEXTURE GENERATION ---
  const [cardTexture, lanyardTexture] = useMemo(() => {
    // 1. Create Card Texture
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 1024;
    cardCanvas.height = 1024;
    const ctx = cardCanvas.getContext('2d')!;

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#4c1d95'); // Purple 900
    grad.addColorStop(1, '#0f172a'); // Slate 950
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle Grid/Pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    for(let i=0; i<1024; i+=50) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke();
    }

    // Branding "VS"
    ctx.fillStyle = '#a855f7'; // Purple 500
    ctx.font = 'bold 80px sans-serif';
    ctx.fillText('VS', 80, 120);

    // Profile "Photo" Area
    ctx.beginPath();
    ctx.arc(512, 300, 130, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fill();
    ctx.strokeStyle = '#2dd4bf'; // Teal 400
    ctx.lineWidth = 10;
    ctx.stroke();

    // Stylized Icon inside profile
    ctx.fillStyle = '#2dd4bf';
    ctx.font = 'bold 150px serif';
    ctx.textAlign = 'center';
    ctx.fillText('V', 512, 350);

    // Name - Moved Up
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 100px Inter, sans-serif';
    ctx.fillText('VAISHNAVI', 512, 550);

    // Title
    ctx.fillStyle = '#94a3b8'; // Slate 400
    ctx.font = '500 45px Inter, sans-serif';
    ctx.fillText('FULL STACK ENGINEER', 512, 630);
    ctx.fillText('GEN-AI SPECIALIST', 512, 690);

    // Barcode fake
    ctx.fillStyle = '#ffffff';
    for(let i=0; i<40; i++) {
        const w = Math.random() * 10 + 2;
        ctx.fillRect(350 + (i*8), 800, w, 60);
    }
    ctx.font = '24px monospace';
    ctx.fillText('ID: 2024-VSDVLP', 512, 900);

    const cTex = new THREE.CanvasTexture(cardCanvas);
    cTex.anisotropy = 16;
    cTex.flipY = false;
    cTex.wrapS = THREE.RepeatWrapping;
    cTex.repeat.x = -1;
    cTex.offset.x = 1;

    // 2. Create Lanyard Texture (High Res)
    const lCanvas = document.createElement('canvas');
    lCanvas.width = 2048; // Increased for sharpest text
    lCanvas.height = 128;
    const lCtx = lCanvas.getContext('2d')!;
    
    // Teal-Purple Gradient
    const lGrad = lCtx.createLinearGradient(0, 0, 2048, 0);
    lGrad.addColorStop(0, '#2dd4bf');
    lGrad.addColorStop(1, '#a855f7');
    lCtx.fillStyle = lGrad;
    lCtx.fillRect(0, 0, 2048, 128);

    // Repeating Text - Monospace for tech vibe
    lCtx.fillStyle = '#000000';
    lCtx.font = 'bold 50px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    lCtx.textAlign = 'left';
    for(let i=0; i<10; i++) {
        lCtx.fillText('VAISHNAVI • ENGINEER • DEVELOPER    ', i * 700, 80);
    }

    const lTex = new THREE.CanvasTexture(lCanvas);
    lTex.wrapS = lTex.wrapT = THREE.RepeatWrapping;
    lTex.anisotropy = 16;

    return [cTex, lTex];
  }, []);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'pointer';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.open("https://drive.google.com/file/d/1Kahl17FxDgAdMchcvzcP-2Q_BE1fP-oc/view?usp=sharing", "_blank");
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture}
                clearcoat={1.0}
                clearcoatRoughness={0}
                roughness={0.8}
                metalness={0.1}
                reflectivity={0.2}
                color="#ffffff"
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2048] : [1000, 1000]}
          useMap
          map={lanyardTexture}
          repeat={[1, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
