import { PropsWithChildren } from "react";

export const THEME_NO_PROVIDER = Symbol("THEME_NO_PROVIDER");

export interface PaletteProps {
  main?: string;
  light?: string;
  dark?: string;
  contrastText?: string;
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
  };
  [propName: string]: any;
}

export type Theme<T = {}> = T & ThemeOptions;

export type ThemeProviderProps<T> = PropsWithChildren<{
  theme?: T;
}>;
