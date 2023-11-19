import { Color } from "@react-three/fiber";
import { ColorClass, Theme } from "../../core";
import { useEffect, useState } from "react";
import { isColorClass } from "../index";
import { Color as ThreeColor } from "three";

export const useResolvedThemeColor = (
  color: ColorClass | Color | undefined,
  theme: Theme,
  variant: "main" | "light" | "dark" | "contrastText" = "main",
  type: "text" | "background" = "text",
) => {
  const [resolvedColor, setResolvedColor] = useState<
    string | number | undefined
  >();

  useEffect(() => {
    let finalColor;

    if (!color) {
      finalColor =
        type === "text"
          ? theme.typography?.color
          : theme.palette?.primary?.[variant];
    } else if (isColorClass(color)) {
      finalColor = theme.palette?.[color]?.[variant];
    } else {
      finalColor = color;
    }

    if (finalColor instanceof ThreeColor) {
      finalColor = (finalColor as ThreeColor).getHexString();
    }

    setResolvedColor(finalColor as typeof resolvedColor);
  }, [color, theme.palette, theme.typography?.color, type, variant]);

  return resolvedColor;
};
