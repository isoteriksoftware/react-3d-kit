import { createContext } from "react";
import { Theme, THEME_NO_PROVIDER } from "./types";

export const ThemeContext = createContext<Theme | typeof THEME_NO_PROVIDER>(
  THEME_NO_PROVIDER,
);
