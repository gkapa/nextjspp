import Head from "next/head";

const locales = {
  en: "en_US",
  ko: "ko_KR",
};

const common = {
  image: "https://www.balconia.co.jp/img/ogp.png",
  url: "https://www.balconia.co.jp",
};

interface Props {
  title: string;
  description: string;
  type?: string;
  keywords?: string;
  image?: string;
  url: string;
}

export default function fun({
  title,
  description,
  type,
  keywords,
  image,
  url,
}: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${common.url}${url}`} />
      <meta property="og:image" content={image ? image : common.image} />
      <meta property="og:site_name" content={title} />
      {/* <meta name="twitter:card" content="summary" /> */}
      {/* <meta name="twitter:site" content="@tcr_jp" /> */}
      <meta name="twitter:url" content={`${common.url}${url}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image ? image : common.image} />
      <link rel="canonical" href={`${common.url}${url}`} />
      <link rel="shortcut icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/logo_balconia.svg" />
    </Head>
  );
}

// rel="canonical"은 표준 페이지를 설정하는 역할을 한다. 표준 페이지란 같은 내용을 표기하는 다수의 URL이 존재할 때 대표되는 URL을 뜻한다. 다음과 같은 블로그 URL이 있다고 가정해보자.

// https://blog.com/articles/title-of-article
// https://blog.com/articles/title-of-article?page=1
// https://blog.com/aritlces?id=1
// https://blog.com?type=article&id=1
// 위 4개의 URL은 모두 같은 내용을 의미하지만 서로 다른 URL을 가지고 있다. 이 때, 해당 페이지에 다음 태그를 추가해 표준 페이지를 설정할 수 있다.

// <!-- https://blog.com/articles/title-of-article을 표준 페이지로 지정 -->
// <link rel="canonical" href="https://blog.com/articles/title-of-article" />
// 표준 페이지를 설정했을 때 얻는 장점은 검색엔진이 중복되는 URL에 접근했을 때, 표준 페이지를 선택해서 크롤링 한다. 때문에 표준 페이지로 지정된 URL이 검색 결과에 노출될 확률이 높아진다.

// rel="alternate"Permalink
// rel="canonical"가 표준 페이지를 정의한다면, rel="alternate"는 다국어로 정의된 페이지/보조 페이지를 정의한다. 다국어 처리가 된 웹사이트가 존재한다고 가정해보자.

// 각각의 언어는 대략 다음과 같은 형태의 URL을 가질 것이다.

// https://blog.com/ <-- 한국어(기본)
// https://blog.com/en
// https://blog.com/de
// 이 때 각 페이지의 header 태그에 다음과 같이 rel="alternate" 태그를 추가할 수 있다. 이렇게 하면 각 언어 별 페이지를 설정해 두면 검색엔진은 사용자의 언어와 일치하는 페이지를 검색 결과에 노출시켜준다.

// <link rel="alternate" hreflang="ko" href="https://blog.com/" />
// <link rel="alternate" hreflang="en" href="https://blog.com/en" />
// <link rel="alternate" hreflang="de" href="https://blog.com/de" />
// 그래서?Permalink
// 위에서 설명한 rel="canonical"과 rel="alternate"를 이용하면 데스크톱과 모바일 사이트를 분리해낼 수 있다. 사실 rel="alternate"에는 추가로 설정할 수 있는 값이 있는데, 바로 media 속성이다. media 속성은 CSS의 media query와 동일한 값을 입력할 수 있다.

// <link rel="alternate" href="https://blog.com/" media="only screen and (max-width: 640px" />
// 검색엔진은 media 속성의 조건을 만족할 경우 보조 페이지를 결과에 노출시킨다. 때문에 데스크톱 페이지에는 rel="alternate"와 media 속성을 이용해 모바일 페이지의 URL을 기록하고, 모바일 페이지에서는 rel="canonical"을 이용해 데스크탑 페이지의 URL과 연결시켜주면 된다.

// <!-- 데스크탑 페이지 -->
// <link rel="alternate" href="https://m.blog.com/" media="only screen and (max-width: 640px" />

// <!-- 모바일 페이지 -->
// <link rel="canonical" href="https://blog.com" />
