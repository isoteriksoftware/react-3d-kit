import { THEME_NO_PROVIDER, Theme } from "./types";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useTheme = <T = {}>(): Theme<T> => {
  const theme = useContext<Theme<T> | typeof THEME_NO_PROVIDER>(ThemeContext);
  if (theme === THEME_NO_PROVIDER)
    throw new Error("This hook must be used within a ThemeProvider");

  return theme;
};
