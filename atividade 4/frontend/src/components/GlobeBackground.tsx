import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x071a10, 1);

    const geometry = new THREE.SphereGeometry(7, 20, 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const ptsGeo = new THREE.BufferGeometry();
    const count = 800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 80;
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const ptsMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x4ade80,
      transparent: true,
      opacity: 0.3,
    });
    const particles = new THREE.Points(ptsGeo, ptsMat);
    scene.add(particles);

    let mouseX = 0, mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const tick = () => {
      requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      globe.rotation.y = t * 0.04;
      globe.rotation.x += 0.02 * (mouseY * 0.4 - globe.rotation.x);
      globe.rotation.y += 0.02 * (mouseX * 0.4 - (globe.rotation.y - t * 0.04));
      renderer.render(scene, camera);
    };
    tick();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="globe-canvas" />;
}
