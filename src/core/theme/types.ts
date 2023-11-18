import { PropsWithChildren } from "react";
import { Color } from "@react-three/fiber";

export const THEME_NO_PROVIDER = Symbol("THEME_NO_PROVIDER");

export interface PaletteProps {
  main?: Color;
  light?: Color;
  dark?: Color;
  contrastText?: Color;
}

export interface ThemeOptions {
  type?: "light" | "dark";
  direction?: "auto" | "ltr" | "rtl";
  palette?: {
    primary?: PaletteProps;
    secondary?: PaletteProps;
    error?: PaletteProps;
    warning?: PaletteProps;
    info?: PaletteProps;
    success?: PaletteProps;
  };
  typography?: {
    font?: string;
    color?: Color;
  };
  [propName: string]: any;
}

export type Theme<T = {}> = T & ThemeOptions;

export type ThemeProviderProps<T> = PropsWithChildren<{
  theme?: Theme<T>;
}>;
