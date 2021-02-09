import { phalette } from "./colorPhalette";

/* eslint-disable */

export const colors = {
  ...phalette,
  primary: {
    main: phalette.indigo[7],
    light: phalette.indigo[4],
    dark: phalette.indigo[10],
  },
  error: {
    main: phalette.red[0],
    light: phalette.red[3],
    dark: phalette.red[14],
  },
};

export const vars = {
  zIndex: {
    sidebar: 220,
    backdrop: 210,
    overlay: 208,
    navbar: 205,
  },
  maxWidth: {
    main: "1080px",
  },
  navbar: {
    height: "100px",
  },
};
