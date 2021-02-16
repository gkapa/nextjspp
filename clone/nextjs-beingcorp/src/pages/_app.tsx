import React from "react";
import Head from "next/head";
import GlobalStyle from "styles/GlobalStyle";
import "styles/normalize.css";

// Redux stuff
import { Provider } from "react-redux";
import { store } from "store";

import Layout from "layouts/Layout";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500&display=swap"
          rel="stylesheet"></link>
      </Head>
      <GlobalStyle />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (context) => {
  let ssr = {};

  return { ssr };
};

export default MyApp;
