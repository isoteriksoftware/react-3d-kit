import React, { Suspense } from "react";
import { BasicSceneProps } from "./types";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Color } from "three";

export const BasicScene: React.FC<BasicSceneProps> = ({
  orbitControls,
  children,
  disableControls,
  disableEnvironment,
  environment,
  ...rest
}) => {
  const {
    enableDamping = true,
    enableZoom = true,
    dampingFactor = 0.01,
    autoRotate = false,
    autoRotateSpeed = -1,
    ...restOrbitControls
  } = orbitControls || {};

  return (
    <Canvas
      scene={{
        background: new Color(0x000000),
      }}
      camera={{ position: [0, 50, 0], fov: 60 }}
      {...rest}
    >
      <Suspense fallback={null}>
        {children}

        {!disableControls && (
          <OrbitControls
            enableDamping={enableDamping}
            enableZoom={enableZoom}
            dampingFactor={dampingFactor}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            minPolarAngle={Math.PI / 2 - 0.5}
            maxPolarAngle={Math.PI / 2 - 0.01}
            {...restOrbitControls}
          />
        )}

        {!disableEnvironment && (
          <Environment preset="sunset" {...environment} />
        )}
      </Suspense>
    </Canvas>
  );
};
