import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Sphere, Stars, Ring } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const Planet = ({ 
  position, 
  color, 
  size, 
  speed, 
  rings,
  emissive,
  orbitRadius,
  orbitSpeed
}: { 
  position: [number, number, number]; 
  color: string;
  size: number;
  speed: number;
  rings?: boolean;
  emissive?: string;
  orbitRadius?: number;
  orbitSpeed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  // Create procedural texture for planet surface
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Create gradient base
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, new THREE.Color(color).multiplyScalar(0.6).getStyle());
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    // Add noise/texture
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const alpha = Math.random() * 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(x, y, 2, 2);
    }
    
    // Add horizontal bands (for gas giants look)
    for (let i = 0; i < 8; i++) {
      const y = (i / 8) * 256;
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.15})`;
      ctx.fillRect(0, y, 256, 10 + Math.random() * 20);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [color]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      // Rotate the planet
      meshRef.current.rotation.y += speed * 0.005;
      meshRef.current.rotation.x = Math.sin(time * speed * 0.1) * 0.1;
    }
    
    if (groupRef.current) {
      // Orbital motion if specified
      if (orbitRadius && orbitSpeed) {
        groupRef.current.position.x = position[0] + Math.cos(time * orbitSpeed) * orbitRadius;
        groupRef.current.position.z = position[2] + Math.sin(time * orbitSpeed) * orbitRadius;
      }
      
      // Enhanced floating motion
      groupRef.current.position.y = position[1] + Math.sin(time * speed * 0.5) * 0.8;
      
      // Subtle scale pulsing
      const pulse = 1 + Math.sin(time * speed * 0.3) * 0.02;
      groupRef.current.scale.setScalar(pulse);
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z = 0.5 + Math.sin(time * 0.2) * 0.1;
      ringRef.current.rotation.x = 1.2 + Math.cos(time * 0.15) * 0.05;
    }
    
    // Pulsing emissive glow
    if (materialRef.current && emissive) {
      materialRef.current.emissiveIntensity = 0.05 + Math.sin(time * speed) * 0.03;
    }
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        <Sphere ref={meshRef} args={[size, 64, 64]}>
          <meshStandardMaterial
            ref={materialRef}
            map={texture}
            roughness={0.8}
            metalness={0.1}
            emissive={emissive || color}
            emissiveIntensity={0.05}
          />
        </Sphere>
        {rings && (
          <Ring ref={ringRef} args={[size * 1.4, size * 2, 64]}>
            <meshStandardMaterial
              color="#d4a574"
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
              roughness={0.9}
            />
          </Ring>
        )}
      </group>
    </Float>
  );
};

const Moon = ({ 
  parentPosition, 
  orbitRadius, 
  size, 
  speed, 
  color 
}: { 
  parentPosition: [number, number, number];
  orbitRadius: number;
  size: number;
  speed: number;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const angle = state.clock.elapsedTime * speed;
      meshRef.current.position.x = parentPosition[0] + Math.cos(angle) * orbitRadius;
      meshRef.current.position.z = parentPosition[2] + Math.sin(angle) * orbitRadius;
      meshRef.current.position.y = parentPosition[1] + Math.sin(angle * 0.5) * 0.5;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[size, 32, 32]}>
      <meshStandardMaterial
        color={color}
        roughness={0.9}
        metalness={0.1}
      />
    </Sphere>
  );
};

const AsteroidBelt = () => {
  const count = 100;
  const asteroids = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 15 + Math.random() * 3,
      size: 0.02 + Math.random() * 0.05,
      speed: 0.1 + Math.random() * 0.1,
      yOffset: (Math.random() - 0.5) * 2,
    }));
  }, []);

  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={ref}>
      {asteroids.map((asteroid, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(asteroid.angle) * asteroid.radius,
            asteroid.yOffset,
            Math.sin(asteroid.angle) * asteroid.radius,
          ]}
        >
          <dodecahedronGeometry args={[asteroid.size]} />
          <meshStandardMaterial color="#8b7355" roughness={1} />
        </mesh>
      ))}
    </group>
  );
};

const ShootingStar = () => {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useRef(Math.random() * 2 + 1);
  const startX = useRef((Math.random() - 0.5) * 40);
  const startY = useRef(Math.random() * 10 + 5);
  const startZ = useRef(-20 - Math.random() * 10);

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * speed.current) % 5;
      ref.current.position.x = startX.current + t * 8;
      ref.current.position.y = startY.current - t * 3;
      ref.current.position.z = startZ.current;
      ref.current.scale.setScalar(t < 0.5 ? t * 2 : Math.max(0, 1 - (t - 0.5) * 0.5));
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
};

const CameraOrbit = () => {
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.05;
    state.camera.position.x = Math.sin(t) * 20;
    state.camera.position.z = Math.cos(t) * 20;
    state.camera.position.y = 2 + Math.sin(t * 0.5) * 3;
    state.camera.lookAt(0, 0, -10);
  });
  return null;
};

const Nebula = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => {
  const ref = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
  
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Radial gradient nebula cloud
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.3, color + '88');
    gradient.addColorStop(0.6, color + '33');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add cloudy noise
    for (let i = 0; i < 3000; i++) {
      const x = 256 + (Math.random() - 0.5) * 400;
      const y = 256 + (Math.random() - 0.5) * 400;
      const dist = Math.sqrt((x - 256) ** 2 + (y - 256) ** 2);
      if (dist > 240) continue;
      const alpha = Math.random() * 0.4 * (1 - dist / 240);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 8 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, [color]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.001;
      ref.current.material.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[scale, scale]} />
      <meshBasicMaterial map={texture} transparent opacity={0.3} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
    </mesh>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 2, 20], fov: 60 }}
        style={{ background: "linear-gradient(to bottom, #0a0a0f, #1a1a2e, #0f0f1a)" }}
        gl={{ alpha: true, antialias: true }}
      >
        <CameraOrbit />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#fff5e6" />
        <pointLight position={[-15, 5, -10]} intensity={0.5} color="#e8915a" />
        <pointLight position={[10, -5, 5]} intensity={0.3} color="#4a90d9" />

        {/* Nebula clouds */}
        <Nebula position={[-25, 10, -50]} color="#e8915a" scale={40} />
        <Nebula position={[30, -5, -60]} color="#4a90d9" scale={50} />
        <Nebula position={[0, 15, -70]} color="#9b59b6" scale={45} />
        <Nebula position={[-15, -10, -55]} color="#2ecc71" scale={35} />

        <Stars
          radius={100}
          depth={100}
          count={3000}
          factor={4}
          saturation={0.3}
          fade
          speed={0.5}
        />
        
        {/* Main large planet - Gas giant with rings (Saturn-like) */}
        <Planet 
          position={[-8, 3, -15]} 
          color="#d4a574" 
          size={4}
          speed={0.4}
          rings={true}
          orbitRadius={2}
          orbitSpeed={0.1}
        />
        
        {/* Blue ice planet (Neptune-like) */}
        <Planet 
          position={[12, -2, -20]} 
          color="#4a90d9" 
          size={3}
          speed={0.5}
          emissive="#2a5a9a"
          orbitRadius={3}
          orbitSpeed={0.15}
        />
        
        {/* Red rocky planet (Mars-like) */}
        <Planet 
          position={[6, 5, -12]} 
          color="#c45c3a" 
          size={1.5}
          speed={0.8}
          orbitRadius={1.5}
          orbitSpeed={0.25}
        />
        
        {/* Small purple planet */}
        <Planet 
          position={[-5, -3, -8]} 
          color="#7a5c8a" 
          size={1}
          speed={1.0}
          orbitRadius={1}
          orbitSpeed={0.3}
        />
        
        {/* Coral accent planet */}
        <Planet 
          position={[0, 8, -25]} 
          color="#e8915a" 
          size={2.5}
          speed={0.6}
          emissive="#e8915a"
          orbitRadius={2.5}
          orbitSpeed={0.12}
        />
        
        {/* Small green planet */}
        <Planet 
          position={[-12, 0, -18]} 
          color="#5a8a6a" 
          size={1.8}
          speed={0.55}
          orbitRadius={2}
          orbitSpeed={0.18}
        />
        
        {/* Moons */}
        <Moon 
          parentPosition={[-8, 3, -15]} 
          orbitRadius={6} 
          size={0.4} 
          speed={0.5}
          color="#aaa"
        />
        <Moon 
          parentPosition={[12, -2, -20]} 
          orbitRadius={5} 
          size={0.3} 
          speed={0.7}
          color="#7ab"
        />
        
        {/* Asteroid belt */}
        <AsteroidBelt />
        
        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <ShootingStar key={i} />
        ))}
      </Canvas>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
    </div>
  );
};

export default Background3D;
