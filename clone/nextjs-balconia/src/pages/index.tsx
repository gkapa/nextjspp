import React from "react";
import { useRouter } from "next/router";

import Head from "atoms/Head";
import Home from "components/home/Home";

export default function fun() {
  const nextRouter = useRouter();

  return (
    <>
      <Head
        title={"balconia株式会社（バルコニア） | マーケティング支援企業"}
        description={
          "balconia株式会社は東京・上海・香港を拠点として、ブランド戦略立案、クリエイティブ制作、システム開発の３つのサービスを提供するマーケティング支援企業です。"
        }
        url={nextRouter.pathname}
      />
      <Home></Home>
    </>
  );
}
