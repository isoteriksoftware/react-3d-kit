import { forwardRef, useState } from "react";
import { Mesh } from "three";
import { ButtonProps } from "./types";
import {
  Center,
  MeshWobbleMaterial,
  RoundedBox,
  useCursor,
} from "@react-three/drei";
import { useTheme } from "../theme";
import { useResolvedThemeColor } from "react-3d-kit";

export const Button = forwardRef<Mesh, ButtonProps>((props, ref) => {
  const {
    children,
    useCustomMaterial,
    color,
    hoverColor,
    width = 10,
    height = 5,
    depth = 2,
    radius = 0.3,
    smoothness = 16,
    wobble,
    wobbleSpeed = 1,
    wobbleIntensity = 0.2,
    ...rest
  } = props;

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const theme = useTheme();
  const resolvedColor = useResolvedThemeColor(
    color,
    theme,
    "main",
    "background",
  );
  const resolvedHoverColor = useResolvedThemeColor(
    hoverColor,
    theme,
    "dark",
    "background",
  );

  return (
    <RoundedBox
      ref={ref}
      args={[width, height, depth]}
      radius={radius}
      smoothness={smoothness}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...rest}
    >
      {!useCustomMaterial &&
        (wobble ? (
          <MeshWobbleMaterial
            color={hovered ? resolvedHoverColor : resolvedColor}
            speed={wobbleSpeed}
            factor={wobbleIntensity}
          />
        ) : (
          <meshStandardMaterial
            color={hovered ? resolvedHoverColor : resolvedColor}
          />
        ))}

      <Center>{children}</Center>
    </RoundedBox>
  );
});
