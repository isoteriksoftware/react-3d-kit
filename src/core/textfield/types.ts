import { Color, GroupProps } from "@react-three/fiber";
import { HtmlProps } from "@react-three/drei/web/Html";
import { ColorClass } from "../theme";
import { TypographyProps } from "../typography";

export type TextFieldProps = Omit<GroupProps, "ref"> & {
  pixelConversionFactor?: number;
  useCustomMaterial?: boolean;
  width?: number;
  height?: number;
  depth?: number;
  backgroundColor?: ColorClass | Color;
  hoverBackgroundColor?: ColorClass | Color;
  focusBackgroundColor?: ColorClass | Color;
  radius?: number;
  smoothness?: number;
  bevelSegments?: number;
  steps?: number;
  creaseAngle?: number;
  textProps?: Omit<TypographyProps, "ref" | "children"> & {
    zOffset?: number;
    focusColor?: ColorClass | Color;
  };
  inputProps?: Omit<JSX.IntrinsicElements["input"], "children">;
  htmlProps?: Omit<HtmlProps, "children">;
};
