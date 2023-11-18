import { forwardRef } from "react";
import { Mesh } from "three";
import { Typography3DProps } from "./types";
import { Text3D } from "@react-three/drei";
import { useTheme } from "../theme";
import { useResolvedColor } from "./useResolvedColor";

export const Typography3D = forwardRef<Mesh, Typography3DProps>(
  (props, ref) => {
    const { children, font, useCustomMaterial, color, ...rest } = props;
    const theme = useTheme();
    const resolvedColor = useResolvedColor(color, theme);

    return (
      <Text3D ref={ref} font={font ?? theme.typography?.font} {...rest}>
        {!useCustomMaterial && <meshStandardMaterial color={resolvedColor} />}
        {children}
      </Text3D>
    );
  },
);
