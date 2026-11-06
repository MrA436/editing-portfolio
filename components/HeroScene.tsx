"use client";
import { useEffect, useRef } from "react";

// Subtle Three.js backdrop for the whole page: a slow, drifting field of fine points shaped like a soundwave.
// Loads three.js lazily, pauses when off-screen, and stays still for reduced-motion users.
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // no WebGL: the page simply shows the plain background
      }
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.set(0, 3.2, 9);
      camera.lookAt(0, 0, 0);

      const cols = 90, rows = 40, spacing = 0.28;
      const positions = new Float32Array(cols * rows * 3);
      let n = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          positions[n++] = (c - cols / 2) * spacing;
          positions[n++] = 0;
          positions[n++] = (r - rows / 2) * spacing;
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: 0xb99a76,
        size: 0.035,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      });
      scene.add(new THREE.Points(geometry, material));
      const attr = geometry.getAttribute("position");

      const update = (t: number) => {
        for (let k = 0; k < cols * rows; k++) {
          const x = positions[k * 3];
          const z = positions[k * 3 + 2];
          attr.setY(k, Math.sin(x * 0.45 + t) * 0.35 + Math.sin(z * 0.6 + t * 0.7) * 0.22);
        }
        attr.needsUpdate = true;
      };

      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const ro = new ResizeObserver(resize);
      ro.observe(mount);
      resize();

      let mouseX = 0;
      const onMove = (e: PointerEvent) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
      };
      let visible = true;
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(mount);

      let raf = 0;
      if (reduceMotion) {
        update(0);
        renderer.render(scene, camera);
      } else {
        window.addEventListener("pointermove", onMove, { passive: true });
        const start = performance.now();
        const loop = () => {
          raf = requestAnimationFrame(loop);
          if (!visible) return;
          update(((performance.now() - start) / 1000) * 0.5);
          camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.03;
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
        };
        loop();
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        ro.disconnect();
        io.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 80%, transparent 100%)",
      }}
    />
  );
}