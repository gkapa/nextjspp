import React from "react";
import "styles/normalize.css";
import GlobalStyle from "styles/GlobalStyle";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (context) => {
  let ssr = {
    apiURL: undefined,
  };

  return { ssr };
};

export default MyApp;
