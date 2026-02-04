import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars, Ring, Cone } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const AsteroidBelt = () => {
  const count = 100;
  const asteroids = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 22 + Math.random() * 4,
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
    <group ref={ref} position={[0, 0, -8]}>
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

// Floating Island centerpiece
const FloatingIsland = () => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Generate rocks for the island base
  const rocks = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 3,
        -1.5 - Math.random() * 2,
        (Math.random() - 0.5) * 3
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      rotation: Math.random() * Math.PI * 2
    }));
  }, []);
  
  // Generate crystals on the island
  const crystals = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 1.5,
        1 + Math.random() * 0.5,
        (Math.random() - 0.5) * 1.5
      ] as [number, number, number],
      scale: 0.2 + Math.random() * 0.3,
      rotation: Math.random() * Math.PI * 2,
      color: ['#e8915a', '#d4a574', '#4a90d9'][Math.floor(Math.random() * 3)]
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.3;
      groupRef.current.rotation.y = time * 0.02;
    }
    
    if (glowRef.current) {
      // Pulsing glow
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, -8]}>
        {/* Main island base - rocky terrain */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.5, 1.5, 1.5, 8, 1]} />
          <meshStandardMaterial 
            color="#3a3535" 
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        
        {/* Grass/terrain top */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 0.3, 12]} />
          <meshStandardMaterial 
            color="#2a4a3a" 
            roughness={0.8}
          />
        </mesh>
        
        {/* Mountain peak */}
        <Cone args={[1.2, 3, 6]} position={[0, 2.5, 0]}>
          <meshStandardMaterial 
            color="#4a4545" 
            roughness={0.85}
            metalness={0.1}
          />
        </Cone>
        
        {/* Snow cap */}
        <Cone args={[0.5, 0.8, 6]} position={[0, 3.8, 0]}>
          <meshStandardMaterial 
            color="#e8e4e0" 
            roughness={0.6}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </Cone>
        
        {/* Hanging rocks underneath */}
        {rocks.map((rock, i) => (
          <mesh key={i} position={rock.position} rotation={[0, rock.rotation, 0]}>
            <dodecahedronGeometry args={[rock.scale]} />
            <meshStandardMaterial color="#3a3535" roughness={1} />
          </mesh>
        ))}
        
        {/* Glowing crystals */}
        {crystals.map((crystal, i) => (
          <mesh key={i} position={crystal.position} rotation={[0, crystal.rotation, Math.PI * 0.1]}>
            <octahedronGeometry args={[crystal.scale]} />
            <meshStandardMaterial 
              color={crystal.color}
              emissive={crystal.color}
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
        
        {/* Ambient glow underneath */}
        <mesh ref={glowRef} position={[0, -2, 0]}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial 
            color="#e8915a" 
            transparent 
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Energy ring around island */}
        <Ring args={[3.5, 3.8, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <meshBasicMaterial 
            color="#e8915a" 
            transparent 
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>
    </Float>
  );
};

// Orbiting planet that circles the floating island
const OrbitingPlanet = ({ 
  orbitRadius, 
  orbitSpeed, 
  startAngle,
  color, 
  size, 
  rotationSpeed,
  rings,
  emissive,
  yOffset = 0
}: { 
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
  color: string;
  size: number;
  rotationSpeed: number;
  rings?: boolean;
  emissive?: string;
  yOffset?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, new THREE.Color(color).multiplyScalar(0.6).getStyle());
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const alpha = Math.random() * 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(x, y, 2, 2);
    }
    
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
    const angle = startAngle + time * orbitSpeed;
    
    if (groupRef.current) {
      // Orbit around center (where floating island is)
      groupRef.current.position.x = Math.cos(angle) * orbitRadius;
      groupRef.current.position.z = -8 + Math.sin(angle) * orbitRadius;
      groupRef.current.position.y = yOffset + Math.sin(time * 0.5 + startAngle) * 0.5;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.005;
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z = 0.5 + Math.sin(time * 0.2) * 0.1;
      ringRef.current.rotation.x = 1.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.2}>
        <Sphere ref={meshRef} args={[size, 64, 64]}>
          <meshStandardMaterial
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
      </Float>
    </group>
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
        <ambientLight intensity={0.25} />
        <directionalLight position={[10, 10, 5]} intensity={0.9} color="#fff5e6" />
        <pointLight position={[-15, 5, -10]} intensity={0.6} color="#e8915a" />
        <pointLight position={[10, -5, 5]} intensity={0.4} color="#4a90d9" />
        <pointLight position={[0, -3, -8]} intensity={0.5} color="#e8915a" />
        
        <Stars
          radius={100}
          depth={100}
          count={3000}
          factor={4}
          saturation={0.3}
          fade
          speed={0.5}
        />
        
        {/* Central Floating Island */}
        <FloatingIsland />
        
        {/* Planets orbiting the floating island */}
        <OrbitingPlanet 
          orbitRadius={12}
          orbitSpeed={0.08}
          startAngle={0}
          color="#d4a574" 
          size={2.5}
          rotationSpeed={0.4}
          rings={true}
          yOffset={2}
        />
        
        <OrbitingPlanet 
          orbitRadius={16}
          orbitSpeed={0.05}
          startAngle={Math.PI * 0.6}
          color="#4a90d9" 
          size={2}
          rotationSpeed={0.5}
          emissive="#2a5a9a"
          yOffset={-1}
        />
        
        <OrbitingPlanet 
          orbitRadius={9}
          orbitSpeed={0.12}
          startAngle={Math.PI * 1.2}
          color="#c45c3a" 
          size={1.2}
          rotationSpeed={0.8}
          yOffset={3}
        />
        
        <OrbitingPlanet 
          orbitRadius={20}
          orbitSpeed={0.04}
          startAngle={Math.PI * 0.3}
          color="#7a5c8a" 
          size={1.8}
          rotationSpeed={0.6}
          yOffset={-2}
        />
        
        <OrbitingPlanet 
          orbitRadius={14}
          orbitSpeed={0.07}
          startAngle={Math.PI * 1.5}
          color="#e8915a" 
          size={1.5}
          rotationSpeed={0.7}
          emissive="#e8915a"
          yOffset={4}
        />
        
        <OrbitingPlanet 
          orbitRadius={18}
          orbitSpeed={0.06}
          startAngle={Math.PI * 0.9}
          color="#5a8a6a" 
          size={1.3}
          rotationSpeed={0.55}
          yOffset={0}
        />
        
        {/* Asteroid belt around everything */}
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
