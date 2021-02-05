// 以下のリンクを参照しました。
// https://velog.io/@jeff0720/Next.js-%EA%B0%9C%EB%85%90-%EC%9D%B4%ED%95%B4-%EB%B6%80%ED%84%B0-%EC%8B%A4%EC%8A%B5%EA%B9%8C%EC%A7%80-%ED%95%B4%EB%B3%B4%EB%8A%94-SSR-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95

// SSRの流れは下記のようになる
// 1. Server Sending Ready to be rendered HTML response to Browser
// 2. Browser Renders the page, Now Viewable, and Browser Downloads JS
// 3. Browser excutes React
// 4. Page Now Interactable

// 従って、下のコードは
// 처음 페이지를 접속했을때 Next.js에 서버에서 응답할때
// styled-components 스타일 정보도 같이 포함하여 랜더링 될 수 있도록해주는 코드
// 를 추가함으로써, styled-components가 hydrate 현상이 나타나지 않게 해줌

// 또한, _document는 SSR일때 html 및 body 태그에 내용을 추가하거나 수정할때 사용되며,
// _document의 내용들은 ssr에서만 호출됨

import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet as StyledSSS } from "styled-components";
import { ServerStyleSheets as MaterialSSS } from "@material-ui/styles";

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const styledSheet = new StyledSSS();
    const materialSheets = new MaterialSSS();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledSheet.collectStyles(
              materialSheets.collect(<App {...props} />),
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledSheet.getStyleElement()}
            {materialSheets.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      throw error;
    } finally {
      styledSheet.seal();
    }
  }
}

export default CustomDocument;
