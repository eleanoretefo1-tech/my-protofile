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

		// Extra neon 3D shapes
		const group = new THREE.Group();
		scene.add(group);

		// Torus Knot (glowing)
		const torusGeo = new THREE.TorusKnotGeometry(1.1, 0.32, 220, 32);
		const torusMat = new THREE.MeshBasicMaterial({ color: 0x34f5c5, wireframe: true, transparent: true, opacity: 0.85 });
		const torus = new THREE.Mesh(torusGeo, torusMat);
		torus.position.set(-2.4, 0.8, -6);
		group.add(torus);

		// Icosahedron wireframe
		const icoGeo = new THREE.IcosahedronGeometry(1.0, 0);
		const icoEdges = new THREE.EdgesGeometry(icoGeo);
		const icoMat = new THREE.LineBasicMaterial({ color: 0x9aa9ff, transparent: true, opacity: 0.85 });
		const ico = new THREE.LineSegments(icoEdges, icoMat);
		ico.position.set(2.6, 1.1, -7.5);
		group.add(ico);

		// Neon rings
		const ringMatA = new THREE.MeshBasicMaterial({ color: 0x00ffa6, transparent: true, opacity: 0.7 });
		const ringMatB = new THREE.MeshBasicMaterial({ color: 0xff5fda, transparent: true, opacity: 0.55 });
		const ringA = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.5, 64), ringMatA);
		const ringB = new THREE.Mesh(new THREE.RingGeometry(0.5, 1.0, 64), ringMatB);
		ringA.position.set(0, 0.6, -5.5);
		ringB.position.set(0, 0.6, -5.5);
		ringA.rotation.x = Math.PI / 2;
		ringB.rotation.x = Math.PI / 2;
		group.add(ringA);
		group.add(ringB);

		// Glow sprites for soft halos
		const haloTexture = new THREE.TextureLoader().load(
			// Tiny inline 1x1 white pixel expanded by size and color
			// eslint-disable-next-line max-len
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAA1JREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII='
		);
		const haloMat = new THREE.SpriteMaterial({ map: haloTexture, color: 0x3cf5ff, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending });
		const haloA = new THREE.Sprite(haloMat.clone());
		haloA.scale.set(6, 6, 1);
		haloA.position.set(-2.4, 0.8, -6);
		const haloB = new THREE.Sprite(haloMat.clone());
		haloB.material = (haloB.material as THREE.SpriteMaterial).clone();
		(haloB.material as THREE.SpriteMaterial).color = new THREE.Color(0xff5fda);
		haloB.scale.set(5, 5, 1);
		haloB.position.set(2.6, 1.1, -7.6);
		scene.add(haloA);
		scene.add(haloB);

		// Animation
		let t = 0;
		const animate = () => {
			t += 0.01;
			// Waves
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				const arr = line.geometry.attributes.position.array as Float32Array;
				for (let v = 0; v < arr.length; v += 3) {
					const x = arr[v + 0];
					const z = arr[v + 2];
					arr[v + 1] = Math.sin(x * 0.22 + z * 0.3 + t) * 0.6 + Math.cos(x * 0.08 + z + t * 0.6) * 0.15;
				}
				line.geometry.attributes.position.needsUpdate = true;
			}
			// Star drift
			const pPos = particles.geometry.attributes.position.array as Float32Array;
			for (let i = 0; i < particleCount; i++) {
				pPos[i * 3 + 2] += 0.06 + Math.random() * 0.02;
				if (pPos[i * 3 + 2] > 2) pPos[i * 3 + 2] = -40;
			}
			particles.geometry.attributes.position.needsUpdate = true;

			// Shapes animation (rotation + pulse + hue shift)
			const pulse = 0.85 + Math.sin(t * 2.0) * 0.15;
			torus.rotation.x += 0.004;
			torus.rotation.y += 0.006;
			(torus.material as THREE.MeshBasicMaterial).opacity = 0.65 + Math.sin(t * 1.7) * 0.2;
			ico.rotation.x -= 0.003;
			ico.rotation.y += 0.004;
			(ico.material as THREE.LineBasicMaterial).opacity = 0.75 + Math.sin(t * 2.2) * 0.15;
			ringA.rotation.z += 0.005;
			ringB.rotation.z -= 0.004;
			ringA.scale.setScalar(1.0 * pulse);
			ringB.scale.setScalar(1.2 * (2 - pulse));
			(haloA.material as THREE.SpriteMaterial).opacity = 0.28 + Math.sin(t * 1.4) * 0.12;
			(haloB.material as THREE.SpriteMaterial).opacity = 0.22 + Math.cos(t * 1.2) * 0.1;

			// Subtle color cycle
			const hue = (Math.sin(t * 0.35) + 1) / 2; // 0..1
			const colorA = new THREE.Color().setHSL(0.45 + 0.2 * hue, 0.9, 0.6);
			const colorB = new THREE.Color().setHSL(0.7 - 0.25 * hue, 0.9, 0.6);
			(gridMaterial.color as THREE.Color).copy(colorA);
			(gridMaterial2.color as THREE.Color).copy(colorB);

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