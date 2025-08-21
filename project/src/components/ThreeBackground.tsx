import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(new THREE.Color(0x0b1220), 12, 42);

		const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 200);
		camera.position.set(0, 2.2, 9);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		// Hidden neon grid (kept for future use)
		const gridGroup = new THREE.Group();
		scene.add(gridGroup);
		const gridMaterial = new THREE.LineBasicMaterial({ color: 0x00ffa6, transparent: true, opacity: 0.0 });
		const gridMaterial2 = new THREE.LineBasicMaterial({ color: 0x4ea3ff, transparent: true, opacity: 0.0 });
		const createCurve = (z: number, colorAlt = false) => {
			const points: THREE.Vector3[] = [];
			for (let x = -20; x <= 20; x += 0.5) {
				const y = Math.sin(x * 0.22 + z * 0.3) * 0.6 + Math.cos(x * 0.08 + z) * 0.15;
				points.push(new THREE.Vector3(x * 0.22, y, z));
			}
			const geo = new THREE.BufferGeometry().setFromPoints(points);
			const line = new THREE.Line(geo, colorAlt ? gridMaterial2 : gridMaterial);
			gridGroup.add(line);
			return line;
		};
		for (let i = 0; i < 40; i++) createCurve(-i * 0.6, i % 2 === 0);
		gridGroup.visible = false;

		// Starfield / particles
		const particlesGeo = new THREE.BufferGeometry();
		const particleCount = 1200;
		const positions = new Float32Array(particleCount * 3);
		const colors = new Float32Array(particleCount * 3);
		for (let i = 0; i < particleCount; i++) {
			positions[i * 3 + 0] = (Math.random() - 0.5) * 30;
			positions[i * 3 + 1] = Math.random() * 10 - 4;
			positions[i * 3 + 2] = -Math.random() * 40;
			const c = new THREE.Color().setHSL(THREE.MathUtils.randFloat(0.45, 0.72), 0.8, THREE.MathUtils.randFloat(0.45, 0.7));
			colors[i * 3 + 0] = c.r;
			colors[i * 3 + 1] = c.g;
			colors[i * 3 + 2] = c.b;
		}
		particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		const particlesMat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.85 });
		const particles = new THREE.Points(particlesGeo, particlesMat);
		scene.add(particles);

		// Glow plane beneath
		const planeGeo = new THREE.PlaneGeometry(60, 60, 1, 1);
		const planeMat = new THREE.MeshBasicMaterial({ color: 0x0b1220, transparent: true, opacity: 0.25 });
		const plane = new THREE.Mesh(planeGeo, planeMat);
		plane.rotation.x = -Math.PI / 2;
		plane.position.y = -2.2;
		scene.add(plane);

		// Lights for planets
		const ambient = new THREE.AmbientLight(0x446677, 0.7);
		const keyLight = new THREE.PointLight(0x88ccff, 1.4, 120);
		keyLight.position.set(4, 6, 6);
		const rimLight = new THREE.DirectionalLight(0xff66cc, 0.6);
		rimLight.position.set(-6, 4, -4);
		scene.add(ambient, keyLight, rimLight);

		// Ring texture via canvas
		const createRingTexture = () => {
			const size = 256;
			const cvs = document.createElement('canvas');
			cvs.width = size; cvs.height = size;
			const ctx = cvs.getContext('2d');
			if (!ctx) return null as unknown as THREE.Texture;
			const grad = ctx.createRadialGradient(size/2, size/2, size*0.35, size/2, size/2, size*0.5);
			grad.addColorStop(0.0, 'rgba(255,255,255,0)');
			grad.addColorStop(0.55, 'rgba(0,0,0,0)');
			grad.addColorStop(0.72, 'rgba(140,210,255,0.55)');
			grad.addColorStop(1.0, 'rgba(255,95,218,0)');
			ctx.fillStyle = grad;
			ctx.fillRect(0,0,size,size);
			const tex = new THREE.CanvasTexture(cvs);
			tex.needsUpdate = true;
			return tex;
		};

		// Planets and moon
		const planetsGroup = new THREE.Group();
		scene.add(planetsGroup);

		const mainPlanet = new THREE.Mesh(
			new THREE.SphereGeometry(1.6, 64, 64),
			new THREE.MeshStandardMaterial({ color: 0x2ab3a6, roughness: 0.85, metalness: 0.08, emissive: 0x082a2a, emissiveIntensity: 0.2 })
		);
		mainPlanet.position.set(-1.4, 0.8, -8);
		planetsGroup.add(mainPlanet);

		const moonPivot = new THREE.Group();
		moonPivot.position.copy(mainPlanet.position);
		const moon = new THREE.Mesh(
			new THREE.SphereGeometry(0.45, 48, 48),
			new THREE.MeshStandardMaterial({ color: 0x9aa9ff, roughness: 0.9, metalness: 0.05, emissive: 0x0a0e2a, emissiveIntensity: 0.15 })
		);
		moon.position.set(2.2, 0.2, 0);
		moonPivot.add(moon);
		scene.add(moonPivot);

		const ringedPlanet = new THREE.Mesh(
			new THREE.SphereGeometry(1.2, 64, 64),
			new THREE.MeshStandardMaterial({ color: 0x6ab0ff, roughness: 0.8, metalness: 0.1, emissive: 0x081a2a, emissiveIntensity: 0.18 })
		);
		ringedPlanet.position.set(2.4, 1.0, -10);
		planetsGroup.add(ringedPlanet);
		const ringTex = createRingTexture();
		const ringMesh = new THREE.Mesh(
			new THREE.RingGeometry(1.6, 2.6, 128),
			new THREE.MeshBasicMaterial({ map: ringTex ?? undefined, color: 0xffffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
		);
		ringMesh.position.copy(ringedPlanet.position);
		ringMesh.rotation.x = Math.PI / 2 - 0.35;
		ringMesh.rotation.y = 0.35;
		scene.add(ringMesh);

		// Animation loop
		let t = 0;
		const animate = () => {
			t += 0.01;
			// Star drift
			const pPos = particles.geometry.attributes.position.array as Float32Array;
			for (let i = 0; i < particleCount; i++) {
				pPos[i * 3 + 2] += 0.06 + Math.random() * 0.02;
				if (pPos[i * 3 + 2] > 2) pPos[i * 3 + 2] = -40;
			}
			particles.geometry.attributes.position.needsUpdate = true;

			// Planet rotations and orbits
			mainPlanet.rotation.y += 0.003;
			moon.rotation.y += 0.006;
			moonPivot.rotation.y += 0.01;
			ringedPlanet.rotation.y += 0.0025;
			ringMesh.rotation.z += 0.0008;

			renderer.render(scene, camera);
			rafRef.current = requestAnimationFrame(animate);
		};
		animate();

		const onResize = () => {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		};
		window.addEventListener('resize', onResize);

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			window.removeEventListener('resize', onResize);
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	}, []);

	return (
		<div ref={containerRef} className="absolute inset-0 pointer-events-none" />
	);
};

export default ThreeBackground;