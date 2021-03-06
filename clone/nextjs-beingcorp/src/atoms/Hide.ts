import styled, { css } from "styled-components";

export const deviceSize = {
  mobile: {
    min: "1px",
    max: "839px",
  },
  tablet: {
    min: "840px",
    max: "1024px",
  },
  laptop: {
    min: "1025px",
    max: "1440px",
  },
};

export const media = {
  lessThanMobile: `@media(max-width: ${deviceSize.mobile.min})`,
  lessThanTablet: `@media(max-width: ${deviceSize.tablet.min})`,
  lessThanLaptop: `@media(max-width: ${deviceSize.laptop.min})`,
  greaterThanMobile: `@media(min-width: ${deviceSize.mobile.max})`,
  greaterThanTablet: `@media(min-width: ${deviceSize.mobile.max})`,
  greaterThanLaptop: `@media(min-width: ${deviceSize.mobile.max})`,
};

interface IProps {
  when:
    | "lessThanMobile"
    | "lessThanTablet"
    | "lessThanLaptop"
    | "greaterThanMobile"
    | "greaterThanTablet"
    | "greaterThanLaptop";
}

export default styled.div.attrs(() => ({}))<IProps>`
  ${(p) => {
    return css`
      ${media[p.when]} {
        display: none;
      }
    `;
  }}
`;
