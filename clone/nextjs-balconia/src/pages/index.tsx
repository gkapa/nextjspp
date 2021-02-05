import React from "react";
import Head from "layouts/head";
import { useRouter } from "next/router";

export default function Home() {
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
      <div>
        SSsdfsdfsdvServer.renderErrorToHTML
        (E:\_PROGRAMMING\React\hosting_2\clone\nextjs-balconia\node_modules\next\dist\server\next-dev-server.js:34:1204)
        at async DevServer.renderToHTML
        (E:\_PROGRAMMING\React\hosting_2\clone\nextjs-balconia\node_modules\next\dist\next-server\server\next-server.js:133:1277)
        at async DevServer.renderToHTML
        (E:\_PROGRAMMING\React\hosting_2\clone\nextjs-balconia\node_modules\next\dist\server\next-dev-server.js:34:578)
        at async DevServer.render
        (E:\_PROGRAMMING\React\hosting_2\clone\nextjs-balconia\node_modules\next\dist\next-server\server\next-server.js:72:236)
        at async Object.fn
        (E:\_PROGRAMMING\React\hosting_2\clone\nextjs-balconia\node_modules\next\dist\next-server\server\next-server.js:56:580)fS
      </div>
    </>
  );
}
