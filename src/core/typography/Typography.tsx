import { TypographyProps } from "./types";
import { forwardRef } from "react";
import { Text } from "@react-three/drei";
import { useTheme } from "../theme";

export const Typography = forwardRef<any, TypographyProps>((props, ref) => {
  const { children, color, font, direction, ...rest } = props;
  const theme = useTheme();

  return (
    <Text
      ref={ref}
      color={color ?? theme.typography?.color}
      font={font ?? theme.typography?.font}
      direction={direction ?? theme.direction}
      {...rest}
    >
      {children}
    </Text>
  );
});
