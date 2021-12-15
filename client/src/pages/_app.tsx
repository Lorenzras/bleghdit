import { CssBaseline, ThemeProvider } from "@mui/material";
import Axios from "axios";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import theme from "../styles/theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
import axios from "axios";

Axios.defaults.baseURL = "http://localhost:8080/api";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <title>My Page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SWRConfig
        value={{
          fetcher: async (url) => {
            try {
              const { data } = await Axios.get(url, { withCredentials: true });

              return data;
            } catch (err: any) {
              console.error(err);
            }
          },
          dedupingInterval: 10000,
        }}
      >
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {!authRoute ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </ThemeProvider>
        </ReduxProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
