import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		particles: THREE.Points[];
		animationId: number;
		count: number;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const SEPARATION = 100;
		const AMOUNTX = 50;
		const AMOUNTY = 50;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.set(0, 600, 1000);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		containerRef.current.appendChild(renderer.domElement);

		const geometry = new THREE.BufferGeometry();
		const positions: number[] = [];
		const colors: number[] = [];
		const color1 = new THREE.Color("#FFD700"); // Gold
		const color2 = new THREE.Color("#F0F0F0"); // Silver

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				positions.push(ix * SEPARATION - (AMOUNTX * SEPARATION) / 2, 0, iy * SEPARATION - (AMOUNTY * SEPARATION) / 2);
				const mixedColor = color1.clone().lerp(color2, Math.random());
				colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
			}
		}

		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 6,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		let count = 0;
		sceneRef.current = { scene, camera, renderer, particles: [points], animationId: 0, count: 0 };

		const animate = () => {
			const animationId = requestAnimationFrame(animate);
			const posArray = geometry.attributes.position.array as Float32Array;
			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					posArray[i * 3 + 1] = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
					i++;
				}
			}
			geometry.attributes.position.needsUpdate = true;
			renderer.render(scene, camera);
			count += 0.1;
			if (sceneRef.current) sceneRef.current.animationId = animationId;
		};

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);
		animate();

		return () => {
			window.removeEventListener('resize', handleResize);
			if (sceneRef.current) cancelAnimationFrame(sceneRef.current.animationId);
			renderer.dispose();
			containerRef.current?.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={containerRef} className={cn('absolute inset-0 overflow-hidden', className)} {...props} />;
}
