import React, { useMemo } from "react";
import { Theme, ThemeProviderProps } from "./types";
import { ThemeContext } from "./context";
import { getContrastTextColor } from "../utils/colors";

const defaultTheme: Theme = {
  type: "dark",
  direction: "ltr",
  palette: {
    primary: {
      main: "#2a9df4",
      light: "#7cbef9",
      dark: "#1c7ac4",
    },
    secondary: {
      main: "#39ff14",
      light: "#70ff5a",
      dark: "#2cbf0a",
    },
    error: {
      main: "#DC143C",
      light: "#F08080",
      dark: "#8B0000",
    },
    warning: {
      main: "#FFBF00",
      light: "#FFE066",
      dark: "#DAA520",
    },
    info: {
      main: "#1E90FF",
      light: "#87CEFA",
      dark: "#4682B4",
    },
    success: {
      main: "#50C878",
      light: "#3CB371",
      dark: "#006400",
    },
  },
  typography: {
    font: "./fonts/Lato_Regular.json",
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
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
