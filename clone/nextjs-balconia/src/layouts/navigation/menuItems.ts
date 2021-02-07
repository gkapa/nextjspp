interface IMenuItem {
  name: string;
  link?: string;
  links?: string[];
}

export const menuItems: IMenuItem[] = [
  {
    name: "Service",
    links: ["aa", "bb"],
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
