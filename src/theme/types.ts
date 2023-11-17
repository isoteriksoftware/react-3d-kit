import { PropsWithChildren } from "react";

export interface PaletteProps {
  main?: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

export interface Theme {
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

export type ThemeProviderProps = PropsWithChildren<{
  theme?: Theme;
}>;

export const THEME_NO_PROVIDER = Symbol("THEME_NO_PROVIDER");
