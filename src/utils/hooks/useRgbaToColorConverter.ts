import { Color } from "three";
import { useRef } from "react";

export const useRgbaToColorConverter = () => {
  const colorRef = useRef(new Color());

  return (rgba: string) => {
    const [r, g, b] = rgba.match(/\d+/g)?.map(Number).slice(0, 3) || [0, 0, 0];
    colorRef.current.set(`rgb(${r}, ${g}, ${b})`);
    return colorRef.current;
  };
};
