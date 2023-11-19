import { ColorClass } from "../theme";
import { Color, MeshProps } from "@react-three/fiber";
import { TypographyProps } from "../typography";

export type ButtonProps = Omit<MeshProps, "args"> & {
  width?: number;
  height?: number;
  depth?: number;
  color?: ColorClass | Color;
  hoverColor?: ColorClass | Color;
  radius?: number;
  smoothness?: number;
  bevelSegments?: number;
  steps?: number;
  creaseAngle?: number;
  useCustomMaterial?: boolean;
  wobble?: boolean;
  wobbleSpeed?: number;
  wobbleIntensity?: number;
  text?: string;
  textProps?: Omit<TypographyProps, "ref">;
};
