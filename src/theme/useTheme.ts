import { Theme, THEME_NO_PROVIDER } from "./types";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  if (theme === THEME_NO_PROVIDER)
    throw new Error("This hook must be used within a ThemeProvider");

  return theme;
};
