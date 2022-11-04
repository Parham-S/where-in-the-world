import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "../styles/globals.css";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import PageLoader from "../components/PageLoader";
import useLoader from "../hooks/useLoader";
import useCustomTheme from "../hooks/useCustomTheme";

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme } = useCustomTheme();
  const loading = useLoader();

  return (
    <>
      <Meta />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? (
          <PageLoader />
        ) : (
          <>
            <Navbar toggleTheme={toggleTheme} />
            <Component {...pageProps} />
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
