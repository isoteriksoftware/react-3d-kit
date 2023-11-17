import { createContext } from "react";
import { THEME_NO_PROVIDER, Theme } from "./types";

export const initThemeContext = <T>() =>
  createContext<Theme<T> | typeof THEME_NO_PROVIDER>(THEME_NO_PROVIDER);
