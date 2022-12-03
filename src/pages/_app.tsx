import "/styles/globals.css";
import { AppProps } from "next/app";
import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <header>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              {"SnowEsamoscのページ"}
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <Component {...pageProps} />
    </>
  );
}
