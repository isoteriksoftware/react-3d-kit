import { forwardRef, useEffect, useRef, useState } from "react";
import { Color, Mesh } from "three";
import { ButtonProps } from "./types";
import {
  Center,
  MeshWobbleMaterial,
  RoundedBox,
  useCursor,
} from "@react-three/drei";
import { useTheme } from "../theme";
import { useResolvedThemeColor } from "react-3d-kit";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";

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
    onPointerOver,
    onPointerOut,
    ...rest
  } = props;

  const materialRef = useRef<any>(null!);
  const colorRef = useRef(new Color("white"));

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
    hoverColor ?? color,
    theme,
    "dark",
    "background",
  );

  const [springs, api] = useSpring(
    () => ({
      color: resolvedColor,
    }),
    [resolvedColor],
  );

  useEffect(() => {
    if (hovered) {
      api.start({ color: resolvedHoverColor });
    } else {
      api.start({ color: resolvedColor });
    }
  }, [api, hovered, resolvedColor, resolvedHoverColor]);

  const handlePointerOver = (evt: ThreeEvent<PointerEvent>) => {
    setHovered(true);
    if (onPointerOver) {
      onPointerOver(evt);
    }
  };

  const handlePointerOut = (evt: ThreeEvent<PointerEvent>) => {
    setHovered(false);
    if (onPointerOut) {
      onPointerOut(evt);
    }
  };

  const rgbaStringToThreeColor = (rgbaString: string): Color => {
    const [r, g, b] = rgbaString.match(/\d+/g)?.map(Number).slice(0, 3) || [
      0, 0, 0,
    ];
    colorRef.current.set(`rgb(${r}, ${g}, ${b})`);
    return colorRef.current;
  };

  useFrame(() => {
    if (materialRef.current && springs.color) {
      materialRef.current.color = rgbaStringToThreeColor(
        springs.color.get() as string,
      );
    }
  });

  return (
    <RoundedBox
      ref={ref}
      args={[width, height, depth]}
      radius={radius}
      smoothness={smoothness}
      {...rest}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {!useCustomMaterial &&
        (wobble ? (
          <MeshWobbleMaterial
            speed={wobbleSpeed}
            factor={wobbleIntensity}
            ref={materialRef}
          />
        ) : (
          <meshStandardMaterial ref={materialRef} />
        ))}

      <Center>{children}</Center>
    </RoundedBox>
  );
});
