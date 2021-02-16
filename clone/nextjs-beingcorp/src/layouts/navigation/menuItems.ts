interface IMenuItem {
  name: string;
  link?: string;
  links?: IMenuItem[];
}

export const menuItems: IMenuItem[] = [
  {
    name: "製品情報",
    link: "/product",
    links: [
      {
        name: "建設業向け製品",
        links: [
          {
            name: "土木工事積算システム\n『Gaia Cloud』",
            link: "",
          },
          {
            name: "土木工事積算システム\n『Gaia10』",
            link: "",
          },
          {
            name:
              "工程管理機能付き ASP 型工事情報共有システム\n『BeingCollaboration PM』",
            link: "",
          },
          {
            name: "入札マネジメントシステム\n『BeingBid』",
            link: "",
          },
          {
            name: "見積・実行予算システム\n『BeingBudget』",
            link: "",
          },
          {
            name: "工程管理型マネジメントシステム\n『BeingProject-CCPM』",
            link: "",
          },
          {
            name: "ASP 型工事情報共有システム\n『BeingCollaboration』",
            link: "",
          },
          {
            name: "工事成績評定点シミュレーション\n『評点PLUS』",
            link: "",
          },
          {
            name: "土木専門のコミュニティ＆マッチングサイト\n『サガシバ』",
            link: "",
          },
          {
            name: "利益を視える化できる現場台帳管理ソフト\n『要 ～KANAME～』",
            link: "",
          },
          {
            name: "上下水道申請図作成 CAD\n『plusCAD水道V』",
            link: "",
          },
          {
            name: "電気設備 CAD\n『plusCAD電気α』",
            link: "",
          },
        ],
      },
      {
        name: "官公庁向け製品",
        links: [
          {
            name: "ASP 型工事情報共有システム",
            link: "",
          },
          {
            name: "工事成績評定システム",
            link: "",
          },
          {
            name: "公共工事積算システム",
            link: "",
          },
          {
            name: "工程管理型マネジメントシステム",
            link: "",
          },
        ],
      },
      {
        name: "生産性向上製品",
        links: [
          {
            name: "CCPM ソフトウェア\n『BeingManagement3』",
            link: "",
          },
          {
            name: "お客様が求める成果にとことんコミット\nTOC コンサルティング",
            link: "",
          },
        ],
      },
    ],
  },
  // {
  //   name: "サポート",
  //   link: "/cs",
  //   links: [
  //     {
  //       name: "サポート情報",
  //       links: [
  //         {
  //           name: "お問い合わせいただく前に",
  //           link: "",
  //         },
  //         {
  //           name: "OS 対応状況",
  //           link: "",
  //         },
  //         {
  //           name: "リモートサポート",
  //           link: "",
  //         },
  //         {
  //           name: "ダウンロードデータ",
  //           link: "",
  //         },
  //         {
  //           name: "サポートからのお知らせ",
  //           link: "",
  //         },
  //         {
  //           name: "Beアカウント新規発行",
  //           link: "",
  //         },
  //       ],
  //     },
  //     {
  //       name: "よくいただくご質問",
  //       links: [
  //         {
  //           name: "Gaia10 に関する FAQ",
  //           link: "",
  //         },
  //         {
  //           name: "Gaia9 に関する FAQ",
  //           link: "",
  //         },
  //         {
  //           name: "BeingProject-CCPM に関する FAQ",
  //           link: "",
  //         },
  //       ],
  //     },
  //     {
  //       name: "お客様ご契約情報",
  //     },
  //   ],
  // },
  // {
  //   name: "IR 情報",
  //   link: "/ir",
  //   links: [
  //     {
  //       name: "株主・投資家のみなさまへ",
  //       links: [
  //         {
  //           name: "代表取締役 メッセージ",
  //           link: "",
  //         },
  //         {
  //           name: "企業理念",
  //           link: "",
  //         },
  //         {
  //           name: "行動指針",
  //           link: "",
  //         },
  //         {
  //           name: "コーポレート・ガバナンス",
  //           link: "",
  //         },
  //         {
  //           name: "業績ハイライト",
  //           link: "",
  //         },
  //         {
  //           name: "財務情報",
  //           link: "",
  //         },
  //         {
  //           name: "個人投資家の皆様へ",
  //           link: "",
  //         },
  //         {
  //           name: "IR ニュース",
  //           link: "",
  //         },
  //         {
  //           name: "IR カレンダー",
  //           link: "",
  //         },
  //         {
  //           name: "電子公告",
  //           link: "",
  //         },
  //         {
  //           name: "よくいただくご質問",
  //           link: "",
  //         },
  //       ],
  //     },
  //     {
  //       name: "株式について",
  //       links: [
  //         {
  //           name: "株式基本情報と手続き",
  //           link: "",
  //         },
  //         {
  //           name: "株価情報（野村證券のサイトへ）",
  //           link: "",
  //         },
  //         {
  //           name: "株主総会について",
  //           link: "",
  //         },
  //         {
  //           name: "定款・株式取扱規則",
  //           link: "",
  //         },
  //       ],
  //     },
  //     {
  //       name: "IR ライブラリー",
  //       links: [
  //         {
  //           name: "決算短信",
  //           link: "",
  //         },
  //         {
  //           name: "報告書",
  //           link: "",
  //         },
  //         {
  //           name: "有価証券報告書",
  //           link: "",
  //         },
  //         {
  //           name: "企業情報",
  //           link: "",
  //         },
  //         {
  //           name: "採用情報",
  //           link: "",
  //         },
  //         {
  //           name: "お問い合わせ",
  //           link: "",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "企業情報",
  //   link: "/corporate",
  //   links: [
  //     {
  //       name: "ビーイングについて",
  //       links: [
  //         {
  //           name: "ごあいさつ",
  //           link: "",
  //         },
  //         {
  //           name: "会社概要",
  //           link: "",
  //         },
  //         {
  //           name: "事業領域",
  //           link: "",
  //         },
  //         {
  //           name: "沿革",
  //           link: "",
  //         },
  //         {
  //           name: "拠点情報",
  //           link: "",
  //         },
  //         {
  //           name: "一般事業主行動計画",
  //           link: "",
  //         },
  //       ],
  //     },
  //     {
  //       name: "ニュースリリース",
  //       links: [
  //         {
  //           name: "お知らせ",
  //           link: "",
  //         },
  //         {
  //           name: "プレスリリース",
  //           link: "",
  //         },
  //         {
  //           name: "イベント",
  //           link: "",
  //         },
  //         {
  //           name: "メンテナンス",
  //           link: "",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "採用情報",
  //   link: "/recruit",
  //   links: [
  //     {
  //       name: "新卒採用情報",
  //       links: [
  //         {
  //           name: "新卒採用サイト",
  //           link: "",
  //         },
  //       ],
  //     },
  //     {
  //       name: "経験者採用情報",
  //       links: [
  //         {
  //           name: "募集要項",
  //           link: "",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "お問い合わせ",
  //   link: "/contact",
  // },
];
