import { createContext } from "react";
import { THEME_NO_PROVIDER, Theme } from "./types";

export const ThemeContext = createContext<
  Theme<any> | typeof THEME_NO_PROVIDER
>(THEME_NO_PROVIDER);
