import { useState, useEffect } from "react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { colors } from "../constants";

function useCustomTheme() {
  const [isDark, setIsDark] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    const isDarkModeEnabled = JSON.parse(
      localStorage.getItem("isDark") || "false"
    );

    if (isDarkModeEnabled === null) {
      setIsDark(prefersDarkMode);
    } else {
      setIsDark(isDarkModeEnabled);
    }
  }, [prefersDarkMode]);

  const toggleTheme = () => {
    setIsDark((prevValue) => {
      localStorage.setItem("isDark", JSON.stringify(!prevValue));
      return !prevValue;
    });
  };

  let theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      secondary: {
        main: isDark ? colors.surfaceDark : colors.surfaceLight,
      },
      text: {
        primary: isDark ? colors.textLight : colors.textDark,
      },
      background: {
        default: isDark ? colors.dark : colors.light,
        paper: isDark ? colors.surfaceDark : colors.surfaceLight,
      },
    },
    typography: {
      fontFamily: '"Nunito Sans", "sans-serif"',
      button: {
        fontWeight: 600,
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return { theme, toggleTheme };
}

export default useCustomTheme;
