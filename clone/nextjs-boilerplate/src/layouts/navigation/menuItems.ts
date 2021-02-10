interface IMenuItem {
  name: string;
  link?: string;
  links?: IMenuItem[];
}

export const menuItems: IMenuItem[] = [
  {
    name: "Service",
    links: [
      { name: "Brand Strategy", link: "/service/brand_strategy" },
      { name: "Creative", link: "/service/brand_strategy" },
      { name: "System Solution", link: "/service/system_solution" },
    ],
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Recruit",
    link: "/recruit",
  },
  {
    name: "Works",
    link: "/works",
  },
  {
    name: "News",
    link: "/news",
  },
  {
    name: "Access",
    link: "/access",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Mail magazine",
    link: "/mailmagazine",
  },
];
