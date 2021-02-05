import React from "react";
import "styles/normalize.css";
import GlobalStyle from "styles/GlobalStyle";

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
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (context) => {
  let ssr = {};

  return { ssr };
};

export default MyApp;
