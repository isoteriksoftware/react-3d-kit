import { Color } from "@react-three/fiber";
import { ColorClass, Theme } from "../theme";
import { useEffect, useState } from "react";
import { isColorClass } from "../../utils";

export const useResolvedColor = (
  color: ColorClass | Color | undefined,
  theme: Theme,
) => {
  const [resolvedColor, setResolvedColor] = useState(color);

  useEffect(() => {
    let finalColor;

    if (!color) {
      finalColor = theme.typography?.color;
    } else if (isColorClass(color)) {
      finalColor = theme.palette?.[color]?.main;
    } else {
      finalColor = color;
    }

    setResolvedColor(finalColor);
  }, [color, theme.palette, theme.typography?.color]);

  return resolvedColor;
};
