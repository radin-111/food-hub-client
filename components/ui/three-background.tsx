"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const frameRef = useRef<number | undefined>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Check if THREE is available
    if (typeof window === 'undefined' || !(window as any).THREE) {
      toast.warning('THREE.js not loaded');
      return;
    }

    const THREE = (window as any).THREE;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Renderer setup with error handling
    let renderer: any;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      rendererRef.current = renderer;
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);
    } catch (error) {
      toast.error('WebGL not supported');
      return;
    }

    // Create floating food particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100; // Reduced for performance
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xff6b35,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const meshes: any[] = [];
    const materials: any[] = [];
    
    for (let i = 0; i < 3; i++) { // Reduced for performance
      const geometry = new THREE.IcosahedronGeometry(
        Math.random() * 0.2 + 0.1,
        1
      );
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(
          0.05 + Math.random() * 0.1,
          0.7,
          0.5
        ),
        transparent: true,
        opacity: 0.2,
        wireframe: Math.random() > 0.5,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      );
      
      scene.add(mesh);
      meshes.push(mesh);
      materials.push(material);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff6b35, 0.8);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    camera.position.z = 5;

    // Mouse interaction with throttling
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Animation with performance optimization
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Smooth mouse following
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate particles
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.001;

      // Rotate and float geometries
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 * (index % 2 === 0 ? 1 : -1);
        mesh.rotation.y += 0.005 * (index % 2 === 0 ? -1 : 1);
        mesh.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.001;
      });

      // Camera follows mouse slightly
      camera.position.x = mouseX * 0.3;
      camera.position.y = mouseY * 0.3;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      clearTimeout(resizeTimeout);
      
      // Dispose of Three.js resources
      meshes.forEach((mesh, index) => {
        mesh.geometry.dispose();
        materials[index]?.dispose();
      });
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      
      if (renderer && mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10" 
      style={{ 
        pointerEvents: 'none',
        opacity: 0.3 // Reduced opacity for better performance
      }}
    />
  );
}
