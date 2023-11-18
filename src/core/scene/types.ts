import { CanvasProps } from "@react-three/fiber";
import { EnvironmentProps, OrbitControlsProps } from "@react-three/drei";

export type BasicSceneProps = CanvasProps & {
  orbitControls?: OrbitControlsProps;
  disableControls?: boolean;
  disableEnvironment?: boolean;
  environment?: EnvironmentProps;
};
