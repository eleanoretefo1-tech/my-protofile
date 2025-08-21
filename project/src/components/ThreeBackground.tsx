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
		renderer.setClearColor(0x000000, 0); // transparent
		container.appendChild(renderer.domElement);

		// Neon gradient grid (curved lines)
		const gridGroup = new THREE.Group();
		scene.add(gridGroup);

		const gridMaterial = new THREE.LineBasicMaterial({
			color: 0x00ffa6,
			transparent: true,
			opacity: 0.55,
		});
		const gridMaterial2 = new THREE.LineBasicMaterial({ color: 0x4ea3ff, transparent: true, opacity: 0.4 });

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

		const lines: THREE.Line[] = [];
		for (let i = 0; i < 40; i++) {
			lines.push(createCurve(-i * 0.6, i % 2 === 0));
		}

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

		// Neon foggy glow plane beneath
		const planeGeo = new THREE.PlaneGeometry(60, 60, 1, 1);
		const planeMat = new THREE.MeshBasicMaterial({ color: 0x0b1220, transparent: true, opacity: 0.25 });
		const plane = new THREE.Mesh(planeGeo, planeMat);
		plane.rotation.x = -Math.PI / 2;
		plane.position.y = -2.2;
		scene.add(plane);

		// ---- Solar System ----
		// Hide the grid in favour of planets
		gridGroup.visible = false;

		// Sun with glow and light
		const sun = new THREE.Mesh(
			new THREE.SphereGeometry(1.1, 64, 64),
			new THREE.MeshStandardMaterial({ color: 0x331100, emissive: 0xffcc66, emissiveIntensity: 3.0, roughness: 1, metalness: 0 })
		);
		sun.position.set(0, 0.8, -9);
		scene.add(sun);
		const sunLight = new THREE.PointLight(0xffcc88, 2.2, 180, 1.6);
		sunLight.position.copy(sun.position);
		scene.add(sunLight);
		const glowTex = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAA1JREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=');
		const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xfff2b3, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
		sunGlow.scale.set(10, 10, 1);
		sunGlow.position.copy(sun.position);
		scene.add(sunGlow);

		// Planets configuration (7 planets)
		const planetConfigs = [
			{ name: 'Mercury', radius: 0.18, distance: 2.0, color: 0x9e8e7e, emissive: 0x332a22, eInt: 0.15, orbit: 0.022, rot: 0.01 },
			{ name: 'Venus', radius: 0.28, distance: 2.8, color: 0xd4b27a, emissive: 0x2a1e12, eInt: 0.18, orbit: 0.018, rot: 0.008 },
			{ name: 'Earth', radius: 0.3, distance: 3.6, color: 0x3aa7ff, emissive: 0x0a1a2a, eInt: 0.2, orbit: 0.016, rot: 0.02 },
			{ name: 'Mars', radius: 0.24, distance: 4.3, color: 0xdf6b4a, emissive: 0x2a0e08, eInt: 0.18, orbit: 0.013, rot: 0.018 },
			{ name: 'Jupiter', radius: 0.7, distance: 5.4, color: 0xd9b38c, emissive: 0x2a1c12, eInt: 0.16, orbit: 0.009, rot: 0.03 },
			{ name: 'Saturn', radius: 0.6, distance: 6.6, color: 0xc8b48a, emissive: 0x231a10, eInt: 0.16, orbit: 0.007, rot: 0.028, ring: { inner: 0.8, outer: 1.3, tilt: 0.35 } },
			{ name: 'Uranus', radius: 0.5, distance: 7.8, color: 0x8fd8ff, emissive: 0x0a1a22, eInt: 0.18, orbit: 0.006, rot: 0.024 }
		] as const;

		const pivots: THREE.Group[] = [];
		const planetMeshes: THREE.Mesh[] = [];
		const ringMeshes: THREE.Mesh[] = [];
		planetConfigs.forEach((cfg) => {
			const pivot = new THREE.Group();
			pivot.position.copy(sun.position);
			scene.add(pivot);
			const mat = new THREE.MeshStandardMaterial({ color: cfg.color, emissive: cfg.emissive, emissiveIntensity: cfg.eInt, roughness: 0.85, metalness: 0.08 });
			const mesh = new THREE.Mesh(new THREE.SphereGeometry(cfg.radius, 48, 48), mat);
			mesh.position.set(cfg.distance, 0, 0);
			pivot.add(mesh);
			pivots.push(pivot);
			planetMeshes.push(mesh);
			// Small halo per planet
			const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xffffff, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }));
			halo.scale.set(cfg.radius * 6, cfg.radius * 6, 1);
			halo.position.set(cfg.distance, 0, 0);
			pivot.add(halo);
			// Rings for Saturn
			// @ts-ignore
			if ((cfg as any).ring) {
				// @ts-ignore
				const r = (cfg as any).ring;
				const ring = new THREE.Mesh(
					new THREE.RingGeometry(r.inner, r.outer, 96),
					new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
				);
				ring.position.set(cfg.distance, 0, 0);
				ring.rotation.x = Math.PI / 2 - r.tilt;
				ring.rotation.y = r.tilt * 0.6;
				pivot.add(ring);
				ringMeshes.push(ring);
			}
		});

		// Animation
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

			// Orbits and rotations
			for (let i = 0; i < planetConfigs.length; i++) {
				pivots[i].rotation.y += (planetConfigs as any)[i].orbit;
				planetMeshes[i].rotation.y += (planetConfigs as any)[i].rot;
			}
			ringMeshes.forEach((rm) => (rm.rotation.z += 0.0008));

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