import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Mesh } from "three";
import { ButtonProps } from "./types";
import {
  Center,
  MeshWobbleMaterial,
  RoundedBox,
  useCursor,
} from "@react-three/drei";
import { useTheme } from "../theme";
import {
  getContrastTextColor,
  isColorClass,
  useResolvedThemeColor,
} from "../../utils";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { Typography } from "../typography";

export const Button = forwardRef<Mesh, ButtonProps>((props, ref) => {
  const {
    children,
    useCustomMaterial,
    color,
    hoverColor,
    width,
    height = 5,
    depth = 2,
    radius = 0.3,
    smoothness = 16,
    wobble,
    wobbleSpeed = 1,
    wobbleIntensity = 0.2,
    onPointerOver,
    onPointerOut,
    text,
    textProps,
    ...rest
  } = props;

  const materialRef = useRef<any>(null);
  const textRef = useRef<any>(null);

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

  const { color: currentColor } = useSpring({
    color: hovered ? resolvedHoverColor : resolvedColor,
  });

  const { fontSize = 3, color: textColor, ...restTextProps } = textProps || {};

  const resolvedTextColor = useResolvedThemeColor(
    textColor || color,
    theme,
    "contrastText",
    "background",
  );

  const resolvedWidth = useMemo(() => {
    if (width) {
      return width;
    }

    if (text) {
      return text.length * fontSize;
    }

    return 10;
  }, [fontSize, text, width]);
  const finalTextColor = useMemo(() => {
    if (textColor) {
      return textColor;
    }

    if (!resolvedTextColor && typeof resolvedColor === "string") {
      return getContrastTextColor(resolvedColor);
    }

    if (
      resolvedTextColor &&
      !isColorClass(color) &&
      typeof resolvedColor === "string"
    ) {
      return getContrastTextColor(resolvedColor);
    }
    return resolvedTextColor;
  }, [color, resolvedColor, resolvedTextColor, textColor]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.position.z = depth / 2 + 0.1;
    }
  }, [depth]);

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

  useFrame(() => {
    if (materialRef.current && currentColor) {
      materialRef.current.color.setStyle(currentColor.get());
    }
  });

  return (
    <RoundedBox
      ref={ref}
      args={[resolvedWidth, height, depth]}
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

      {text && (
        <Center>
          <Typography
            fontSize={fontSize}
            color={finalTextColor}
            ref={textRef}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            {...restTextProps}
          >
            {text}
          </Typography>
        </Center>
      )}
      {children}
    </RoundedBox>
  );
});
