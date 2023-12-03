import { Group } from "three";
import { TextFieldProps } from "./types";
import {
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  forwardRef,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useTheme } from "../theme";
import { useResolvedThemeColor } from "../../utils";
import { Html, RoundedBox, useCursor } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { Typography } from "../typography";
import { useSpring } from "@react-spring/three";

export const TextField = forwardRef<Group, TextFieldProps>((props, ref) => {
  const {
    children,
    backgroundColor,
    focusBackgroundColor,
    hoverBackgroundColor,
    textProps,
    htmlProps,
    inputProps,
    width,
    height,
    useCustomMaterial,
    pixelConversionFactor = 100,
    depth = 0.5,
    radius = 1,
    smoothness = 16,
    bevelSegments,
    steps,
    creaseAngle,
    onPointerOver,
    onPointerOut,
    ...rest
  } = props;

  const {
    fontSize = 3,
    color: textColor,
    focusColor: textFocusColor,
    zOffset,
    ...restTextProps
  } = textProps || {};

  const {
    center = true,
    transform = true,
    occlude = "blending",
    ...restHtmlProps
  } = htmlProps || {};

  const {
    type = "text",
    onChange,
    onKeyUp,
    onFocus,
    onBlur,
    style,
    ...restInputProps
  } = inputProps || {};

  const textRef = useRef<any>(null);
  const materialRef = useRef<any>(null);

  const [typedText, setTypedText] = useState("");
  const [focused, setFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered, "text");

  const theme = useTheme();
  const resolvedBackgroundColor = useResolvedThemeColor(
    backgroundColor,
    theme,
    "main",
    "background",
  );
  const resolvedHoverBackgroundColor = useResolvedThemeColor(
    hoverBackgroundColor ?? backgroundColor,
    theme,
    "dark",
    "background",
  );
  const resolvedFocusBackgroundColor = useResolvedThemeColor(
    focusBackgroundColor,
    theme,
    "main",
    "background",
  );
  const resolvedTextColor = useResolvedThemeColor(
    textColor || backgroundColor,
    theme,
    "contrastText",
    "background",
  );
  const resolvedFocusTextColor = useResolvedThemeColor(
    textFocusColor || backgroundColor,
    theme,
    "contrastText",
    "background",
  );

  const [resolvedWidth, resolvedHeight] = useMemo(() => {
    const fieldWidth = width || 25;
    const fieldHeight = height || fontSize * 2.5;

    return [fieldWidth, fieldHeight];
  }, [fontSize, height, width]);

  const resolvedText = useMemo(() => {
    if (!focused) {
      return typedText;
    }

    return (
      typedText.slice(0, caretPosition) + "|" + typedText.slice(caretPosition)
    );
  }, [caretPosition, focused, typedText]);

  const springs = useSpring({
    backgroundColor: hovered
      ? resolvedHoverBackgroundColor
      : focused
        ? resolvedFocusBackgroundColor
        : resolvedBackgroundColor,
  });

  useEffect(() => {
    if (textRef.current) {
      //const textWidth = fontSize * typedText.length * 0.5;

      textRef.current.position.x = -resolvedWidth / 2;
      textRef.current.position.z = zOffset || depth / 2 + 0.1;
    }
  }, [depth, fontSize, resolvedWidth, typedText.length, zOffset]);

  useFrame(() => {
    if (materialRef.current && springs.backgroundColor) {
      materialRef.current.color.setStyle(springs.backgroundColor.get());
    }
  });

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

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setTypedText(evt.currentTarget.value);

    if (onChange) {
      onChange(evt);
    }
  };

  const handleKeyUp = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.currentTarget.selectionStart) {
      setCaretPosition(evt.currentTarget.selectionStart);
    }

    if (onKeyUp) {
      onKeyUp(evt);
    }
  };

  const handleFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setFocused(true);

    if (onFocus) {
      onFocus(evt);
    }
  };

  const handleBlur = (evt: FocusEvent<HTMLInputElement>) => {
    setFocused(false);

    if (onBlur) {
      onBlur(evt);
    }
  };

  return (
    <group
      ref={ref}
      {...rest}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <group castShadow>
        <Html
          center={center}
          transform={transform}
          occlude={occlude}
          {...restHtmlProps}
        >
          <input
            type={type}
            {...restInputProps}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              width: `${(resolvedWidth - 1) * pixelConversionFactor}px`,
              height: `${(resolvedHeight - 1) * pixelConversionFactor}px`,
              opacity: "0",
              ...style,
            }}
          />
        </Html>
        <Typography
          ref={textRef}
          fontSize={fontSize}
          color={focused ? resolvedFocusTextColor : resolvedTextColor}
          textAlign="left"
          anchorX="left"
          anchorY="middle"
          overflowWrap="normal"
          castShadow
          {...restTextProps}
          maxWidth={resolvedWidth - 1}
        >
          {resolvedText}
        </Typography>
      </group>

      <RoundedBox
        castShadow
        receiveShadow
        args={[resolvedWidth, resolvedHeight, depth]}
        radius={radius}
        smoothness={smoothness}
        bevelSegments={bevelSegments}
        steps={steps}
        creaseAngle={creaseAngle}
      >
        {!useCustomMaterial && <meshStandardMaterial ref={materialRef} />}
        {children}
      </RoundedBox>
    </group>
  );
});
