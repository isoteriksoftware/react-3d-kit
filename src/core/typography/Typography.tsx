import { TypographyProps } from "./types";
import { forwardRef } from "react";
import { Text } from "@react-three/drei";
import { useTheme } from "../theme";
import { useResolvedColor } from "./useResolvedColor";

export const Typography = forwardRef<any, TypographyProps>((props, ref) => {
  const { children, color, font, direction, ...rest } = props;
  const theme = useTheme();
  const resolvedColor = useResolvedColor(color, theme);

  return (
    <Text
      ref={ref}
      color={resolvedColor}
      font={
        font ??
        (typeof theme.typography?.font === "string"
          ? (theme.typography?.font as string)
          : undefined)
      }
      direction={direction ?? theme.direction}
      {...rest}
    >
      {children}
    </Text>
  );
});
