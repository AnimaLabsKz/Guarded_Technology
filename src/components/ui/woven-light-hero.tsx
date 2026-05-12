"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";

export const WovenLightHero = () => {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const textControls = useAnimation();

  useEffect(() => {
    textControls.start((i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1 + 0.5, duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }
    }));
  }, [textControls]);

  const title = t("products", "hero_title");
  const subtitle = t("products", "hero_subtitle");

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <WovenCanvas />
      <div className="absolute inset-0 z-[1]" style={{
        background: `radial-gradient(circle_at_center,transparent_0%,${resolvedTheme === "dark" ? "#050505" : "#F5F5F7"}_70%)`
      }} />

      <div className="relative z-[2] text-center px-6">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {title.split(" ").map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial={{ opacity: 0, y: 30 }}
              animate={textControls}
              className="inline-block mr-3 rtl:mr-0 rtl:ml-3 text-foreground"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  );
};

const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    const colorGold = new THREE.Color("#D4AF37");
    const colorSilver = new THREE.Color("#E0E0E0");

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const c = Math.random() > 0.5 ? colorGold : colorSilver;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: 1.0,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    torusKnot.dispose();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const cx = positions[ix], cy = positions[iy], cz = positions[iz];
        const ox = originalPositions[ix], oy = originalPositions[iy], oz = originalPositions[iz];

        const dx = cx - mouseWorld.x, dy = cy - mouseWorld.y, dz = cz - mouseWorld.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 1.5 && dist > 0) {
          const force = (1.5 - dist) * 0.01;
          const invDist = 1 / dist;
          velocities[ix] += dx * invDist * force;
          velocities[iy] += dy * invDist * force;
          velocities[iz] += dz * invDist * force;
        }

        velocities[ix] += (ox - cx) * 0.001;
        velocities[iy] += (oy - cy) * 0.001;
        velocities[iz] += (oz - cz) * 0.001;

        velocities[ix] *= 0.95;
        velocities[iy] *= 0.95;
        velocities[iz] *= 0.95;

        positions[ix] += velocities[ix];
        positions[iy] += velocities[iy];
        positions[iz] += velocities[iz];
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = elapsedTime * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default WovenLightHero;
