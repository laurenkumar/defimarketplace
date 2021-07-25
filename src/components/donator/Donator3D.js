import * as THREE from "three";
import React, {useEffect} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Physics, usePlane, useCompoundBody, useSphere} from "@react-three/cannon";
import {EffectComposer, SSAO} from "@react-three/postprocessing";

function Donator3D() {
  const baubleMaterial = new THREE.MeshLambertMaterial({ color: "#00a99f", transparent: true, opacity: 0.9 });
  const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
  const baubles = [...Array(50)].map(() => ({
    args: [0.6, 0.6, 0.8, 0.8, 1][Math.floor(Math.random() * 5)],
    mass: 0.7,
    angularDamping: 0.5,
    linearDamping: 0.95,
  }));

  function Bauble({ vec = new THREE.Vector3(), ...props }) {
    const [ref, api] = useCompoundBody(() => ({
      ...props,
      shapes: [
        { type: "Box", position: [0, 0, 1.2 * props.args], args: new THREE.Vector3().setScalar(props.args * 0.4).toArray() },
        { type: "Sphere", args: props.args },
      ],
    }));
    useEffect(() => api.position.subscribe((p) => api.applyForce(vec.set(...p).normalize().multiplyScalar(-props.args * 35).toArray(), [0, 0, 0])), [api]);
    return (
      <group ref={ref} dispose={null}>
        <mesh scale={props.args} geometry={sphereGeometry} material={baubleMaterial} />
      </group>
    );
  }

  function Collisions() {
    const viewport = useThree((state) => state.viewport);
    usePlane(() => ({ position: [0, 0, 0], rotation: [0, 0, 0] }));
    usePlane(() => ({ position: [0, 0, 8], rotation: [0, -Math.PI, 0] }));
    usePlane(() => ({ position: [0, -4, 0], rotation: [-Math.PI / 2, 0, 0] }));
    usePlane(() => ({ position: [0, 4, 0], rotation: [Math.PI / 2, 0, 0] }));
    const [, api] = useSphere(() => ({ type: "Kinematic", args: 2 }));
    return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 2.5));
  }

  return (
    <div className="donator">
      <div className="donator-text">
        <h1>Thank You !</h1>
        <p>
          <b>To all of you who contributed</b>
          <br />
          And keeps contributing to this project
        </p>
      </div>
      <p className="donator-drag">
        DRAG CURSOR ●
      </p>
      <Canvas
        dpr={1.5}
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 35, near: 10, far: 40 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}>
        <ambientLight intensity={0.75} />
        <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="green" />
        <directionalLight position={[0, 5, -4]} intensity={4} />
        <directionalLight position={[0, -15, -0]} intensity={4} color="blue" />
        <Physics gravity={[0, 0, 0]} iterations={1} broadphase="SAP">
          <Collisions />
          {baubles.map((props, i) => <Bauble key={i} {...props} />) /* prettier-ignore */}
        </Physics>
        <EffectComposer multisampling={0}>
          <SSAO samples={11} radius={30} intensity={30} luminanceInfluence={0.6} color="green" />
          <SSAO samples={21} radius={5} intensity={30} luminanceInfluence={0.6} color="blue" />
        </EffectComposer>
      </Canvas>

      <div class='marquee-bottom'>
        <span>Thank you to donator</span>
        <span>Thank you to donator</span>
        <span>Thank you to donator</span>
        <span>Thank you to donator</span>
        <span>Thank you to donator</span>
        <span>Thank you to donator</span>
        <span>Thank you to donator</span>
      </div>
    </div>
  );
}

export default Donator3D;