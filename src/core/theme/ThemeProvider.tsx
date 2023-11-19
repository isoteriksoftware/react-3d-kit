import React, { useMemo } from "react";
import { Theme, ThemeProviderProps } from "./types";
import { ThemeContext } from "./ThemeContext";
import { getContrastTextColor } from "../../utils";
import LatoRegular from "../assets/fonts/Lato_Regular.json";

export const defaultTheme: Theme = {
  type: "dark",
  direction: "ltr",
  palette: {
    primary: {
      main: "#342ACB",
      light: "#6159E6",
      dark: "#1D1C7B",
    },
    secondary: {
      main: "#FF8F00",
      light: "#FFC046",
      dark: "#C56000",
    },
    error: {
      main: "#D32F2F",
      light: "#FF6659",
      dark: "#9A0007",
    },
    warning: {
      main: "#FFA000",
      light: "#FFC947",
      dark: "#C67100",
    },
    info: {
      main: "#1976D2",
      light: "#63A4FF",
      dark: "#004BA0",
    },
    success: {
      main: "#388E3C",
      light: "#6ABF69",
      dark: "#00600F",
    },
  },
  typography: {
    font: LatoRegular,
    color: "#ffffff",
  },
};

export const ThemeProvider = <T extends {} = {}>({
  theme,
  children,
}: ThemeProviderProps<T>) => {
  const mergedTheme = useMemo(() => {
    const merged = { ...defaultTheme, ...theme };

    return {
      ...merged,
      palette: {
        ...merged.palette,
        primary: {
          ...merged.palette?.primary,
          contrastText: getContrastTextColor(
            merged.palette?.primary?.main as string,
          ),
        },
        secondary: {
          ...merged.palette?.secondary,
          contrastText: getContrastTextColor(
            merged.palette?.secondary?.main as string,
          ),
        },
        error: {
          ...merged.palette?.error,
          contrastText: getContrastTextColor(
            merged.palette?.error?.main as string,
          ),
        },
        warning: {
          ...merged.palette?.warning,
          contrastText: getContrastTextColor(
            merged.palette?.warning?.main as string,
          ),
        },
        info: {
          ...merged.palette?.info,
          contrastText: getContrastTextColor(
            merged.palette?.info?.main as string,
          ),
        },
        success: {
          ...merged.palette?.success,
          contrastText: getContrastTextColor(
            merged.palette?.success?.main as string,
          ),
        },
      },
      typography: {
        ...defaultTheme.typography,
        ...theme?.typography,
      },
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
