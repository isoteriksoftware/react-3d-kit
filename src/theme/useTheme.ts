import { THEME_NO_PROVIDER, Theme } from "./types";
import { useContext } from "react";
import { initThemeContext } from "./context";

export const useTheme = <T = {}>(): Theme<T> => {
  const theme = useContext<Theme<T> | typeof THEME_NO_PROVIDER>(
    initThemeContext<T>(),
  );
  if (theme === THEME_NO_PROVIDER)
    throw new Error("This hook must be used within a ThemeProvider");

  return theme;
};
