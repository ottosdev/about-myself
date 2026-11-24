"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { roles, monthIndex, nowYM, totalMonths } from "@/content/career";
import { readProgress } from "@/lib/useSectionProgress";

export const HERO_SHARE = 0.12;

const AMBER = new THREE.Color("#f2a93b");
const TIDE = new THREE.Color("#4fd1c5");
const INK = "#08111f";

function colorAt(x: number) {
  return AMBER.clone().lerp(TIDE, Math.min(1, Math.max(0, x / totalMonths)));
}

type Branch = {
  id: string;
  client: string;
  points: THREE.Vector3[];
  commits: THREE.Vector3[];
  peak: THREE.Vector3;
  color: THREE.Color;
  open: boolean;
  start: number;
  end: number;
};

function buildBranches(): Branch[] {
  return roles.map((r, i) => {
    const x0 = monthIndex(r.start);
    const x1 = monthIndex(r.end ?? nowYM());
    const open = r.end === null;
    const side = i % 2 === 0 ? 1 : -1;
    const h = side * (1.7 + (i % 3) * 0.55);
    const z = ((i % 3) - 1) * 1.4;
    const w = Math.max(1.2, x1 - x0);
    const d = Math.min(1.4, w / 3.2);
    const ctrl = [
      new THREE.Vector3(x0, 0, 0),
      new THREE.Vector3(x0 + d * 0.6, h * 0.55, z * 0.55),
      new THREE.Vector3(x0 + d * 1.4, h, z),
      new THREE.Vector3(x0 + w - d * 1.4, h, z),
    ];
    if (open) {
      ctrl.push(new THREE.Vector3(x0 + w + 1.5, h, z));
    } else {
      ctrl.push(new THREE.Vector3(x0 + w - d * 0.6, h * 0.55, z * 0.55), new THREE.Vector3(x0 + w, 0, 0));
    }
    const curve = new THREE.CatmullRomCurve3(ctrl, false, "centripetal");
    const points = curve.getPoints(80);
    const nCommits = Math.max(2, Math.round(w / 1.6));
    const commits = Array.from({ length: nCommits }, (_, k) => curve.getPoint(0.15 + (0.7 * k) / Math.max(1, nCommits - 1)));
    return {
      id: r.id,
      client: r.client,
      points,
      commits,
      peak: curve.getPoint(open ? 0.6 : 0.5),
      color: colorAt(x0),
      open,
      start: x0,
      end: x1,
    };
  });
}

export function activeRoleIndex(month: number): number {
  let idx = 0;
  roles.forEach((r, i) => {
    if (monthIndex(r.start) <= month + 0.5) idx = i;
  });
  return idx;
}

function smooth(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

function CameraRig({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const look = useRef(new THREE.Vector3(totalMonths / 2, 0, 0));
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useFrame((state, dt) => {
    const { camera, scene } = state;
    const p = readProgress(sectionRef.current);
    const t = smooth(p / HERO_SHARE);
    const f = Math.max(0, (p - HERO_SHARE) / (1 - HERO_SHARE)) * (totalMonths + 2);

    const narrow = state.size.width < state.size.height;
    const overviewPos = new THREE.Vector3(narrow ? -14 : -4, narrow ? 8 : 5.5, narrow ? 24 : 15);
    const overviewLook = new THREE.Vector3(narrow ? 24 : 9, narrow ? -4 : -2.6, -3);
    const travelPos = new THREE.Vector3(f - 8, 3.4, 13.5);
    const travelLook = new THREE.Vector3(f + 3, 0.3, 0);

    targetPos.current.copy(overviewPos).lerp(travelPos, t);
    targetLook.current.copy(overviewLook).lerp(travelLook, t);

    const k = 1 - Math.exp(-dt * 4);
    camera.position.lerp(targetPos.current, k);
    look.current.lerp(targetLook.current, k);
    camera.lookAt(look.current);

    if (scene.fog instanceof THREE.Fog) {
      scene.fog.near = THREE.MathUtils.lerp(30, 12, t);
      scene.fog.far = THREE.MathUtils.lerp(110, 45, t);
    }
  });
  return null;
}

function Plankton() {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 500;
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = rand() * (totalMonths + 20) - 10;
      arr[i * 3 + 1] = (rand() - 0.5) * 18;
      arr[i * 3 + 2] = (rand() - 0.5) * 22;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  useFrame((state) => {
    if (ref.current) ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.4;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.06} color="#8d99ab" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

const FONT = "/fonts/plex-mono.woff";

function Label({
  position,
  color,
  size,
  children,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  children: string;
}) {
  return (
    <Billboard position={position}>
      <Text font={FONT} fontSize={size} color={color} anchorX="center" anchorY="middle">
        {children}
      </Text>
    </Billboard>
  );
}

function Head({ position }: { position: THREE.Vector3 }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const s = 1 + ((state.clock.elapsedTime * 0.8) % 1) * 1.6;
    if (ring.current) {
      ring.current.scale.setScalar(s);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - (s - 1) / 1.6);
    }
  });
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={TIDE} />
      </mesh>
      <mesh ref={ring}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={TIDE} transparent opacity={0.6} depthWrite={false} />
      </mesh>
      <Label position={[0, 0.8, 0]} color="#4fd1c5" size={0.36}>
        HEAD, hoje
      </Label>
    </group>
  );
}

function Graph({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const branches = useMemo(() => buildBranches(), []);
  const activeRef = useRef(-1);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  const mainPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const cols: THREE.Color[] = [];
    for (let x = -2; x <= totalMonths + 2; x += 0.5) {
      pts.push(new THREE.Vector3(x, 0, 0));
      cols.push(colorAt(x));
    }
    return { pts, cols };
  }, []);

  const years = useMemo(() => {
    const out: { x: number; label: string }[] = [{ x: 0, label: "jun 2021" }];
    for (let y = 2022; y <= 2026; y++) out.push({ x: monthIndex(`${y}-01`), label: String(y) });
    return out;
  }, []);

  useFrame(() => {
    const p = readProgress(sectionRef.current);
    const inHero = p < HERO_SHARE * 0.6;
    const f = Math.max(0, (p - HERO_SHARE) / (1 - HERO_SHARE)) * (totalMonths + 2);
    const a = inHero ? -1 : activeRoleIndex(f);
    if (a === activeRef.current) return;
    activeRef.current = a;
    groupRefs.current.forEach((g, i) => {
      if (!g) return;
      const on = a === -1 || i === a;
      g.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.Material & { opacity?: number };
        if (m && "opacity" in m) {
          m.transparent = true;
          m.opacity = on ? 1 : 0.22;
        }
      });
    });
  });

  return (
    <group>
      <Line points={mainPoints.pts} vertexColors={mainPoints.cols} lineWidth={2.6} />
      {years.map((y) => (
        <group key={y.label} position={[y.x, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.04, 0.5, 0.04]} />
            <meshBasicMaterial color="#8d99ab" />
          </mesh>
          <Label position={[0, -0.9, 0]} color="#8d99ab" size={0.34}>
            {y.label}
          </Label>
        </group>
      ))}
      {branches.map((b, i) => (
        <group
          key={b.id}
          ref={(g) => {
            groupRefs.current[i] = g;
          }}
        >
          <Line points={b.points} color={b.color} lineWidth={2} transparent />
          {b.commits.map((c, k) => (
            <mesh key={k} position={c}>
              <sphereGeometry args={[0.09, 12, 12]} />
              <meshBasicMaterial color={b.color} transparent />
            </mesh>
          ))}
          <mesh position={[b.start, 0, 0]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshBasicMaterial color={b.color} transparent />
          </mesh>
          {!b.open && (
            <mesh position={[b.end, 0, 0]}>
              <torusGeometry args={[0.17, 0.05, 8, 24]} />
              <meshBasicMaterial color={b.color} transparent />
            </mesh>
          )}
          <Label position={[b.peak.x, b.peak.y + (b.peak.y > 0 ? 0.55 : -0.55), b.peak.z]} color={`#${b.color.getHexString()}`} size={0.32}>
            {b.client}
          </Label>
        </group>
      ))}
      <Head position={branches[branches.length - 1].points[branches[branches.length - 1].points.length - 1]} />
    </group>
  );
}

export default function GitGraphScene({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [-4, 5.5, 15], fov: 42, near: 0.1, far: 400 }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 40, 140]} />
      <CameraRig sectionRef={sectionRef} />
      <Plankton />
      <Graph sectionRef={sectionRef} />
    </Canvas>
  );
}
