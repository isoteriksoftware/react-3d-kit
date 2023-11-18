import { useState, useEffect, useMemo } from "react";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";

type FontData = string | { [key: string]: any };

export const useFontLoader = (fontData: FontData): Font | null => {
  const [font, setFont] = useState<Font | null>(null);
  const loader = useMemo(() => new FontLoader(), []);

  useEffect(() => {
    if (typeof fontData === "string") {
      try {
        const parsedFont = JSON.parse(fontData);
        const loadedFont = loader.parse(parsedFont);
        setFont(loadedFont);
      } catch (error) {
        loader.load(fontData, (loadedFont) => {
          setFont(loadedFont);
        });
      }
    } else if (typeof fontData === "object") {
      const loadedFont = loader.parse(fontData);
      setFont(loadedFont);
    }
  }, [fontData, loader]);

  return font;
};
