import React from "react";

import { useRouter } from "next/router";

import Head from "atoms/Head";
import Home from "components/home/Home";

export default function fun(props) {
  const nextRouter = useRouter();

  return (
    <>
      <Head
        title={"XX株式会社（XX） | XX支援企業"}
        description={"XX開発の３つのサービスを提供するXX支援企業です。"}
        url={nextRouter.pathname}
      />
      <Home></Home>
    </>
  );
}
