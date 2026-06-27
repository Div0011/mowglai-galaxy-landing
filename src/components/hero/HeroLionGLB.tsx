"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function LionModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/assets/lion.glb");
  const { actions } = useAnimations(animations, group);
  const [modelOffset, setModelOffset] = React.useState<[number, number, number]>([0, 0, 0]);

  // Apply rich golden materials and center geometry
  useEffect(() => {
    if (!scene) return;
    
    // Center the model geometry based only on actual meshes
    const box = new THREE.Box3();
    let hasMesh = false;
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        if (!hasMesh) {
          box.setFromObject(child);
          hasMesh = true;
        } else {
          box.expandByObject(child);
        }
      }
    });

    if (hasMesh) {
      const center = new THREE.Vector3();
      box.getCenter(center);
      setModelOffset([-center.x, -center.y, -center.z]);
    }

    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (!mesh.material || Array.isArray(mesh.material)) return;
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#D4A017"),
          emissive: new THREE.Color("#5A3000"),
          emissiveIntensity: 0.15,
          roughness: 0.45,
          metalness: 0.15,
          clearcoat: 0.2,
          clearcoatRoughness: 0.3,
        });
      }
    });
  }, [scene]);

  // Play idle animation
  useEffect(() => {
    const available = Object.keys(actions);
    const idle = available.find(a => /idle|survey|stand/i.test(a)) || available[0];
    if (idle && actions[idle]) {
      actions[idle]?.reset().play();
    }
  }, [actions]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating
    group.current.position.y = Math.sin(t * 1.5) * 0.05;
    // Look at mouse
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      (state.mouse.x * Math.PI) / 8 - 0.2,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      (state.mouse.y * Math.PI) / 10,
      0.05
    );
  });

  return (
    <group ref={group}>
      <primitive object={scene} position={modelOffset} />
      <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={8} blur={1.5} far={3} />
    </group>
  );
}

export default function HeroLionGLB() {
  const [isMobile, setIsMobile] = React.useState(true); // default true for SSR

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div className="w-full h-full relative pointer-events-auto lg:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#fff1d0" />
        <pointLight position={[-5, 2, 5]} intensity={1.0} color="#F5D061" />
        
        <React.Suspense fallback={null}>
          <group scale={0.03}>
            <LionModel />
          </group>
          <Environment preset="sunset" />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
