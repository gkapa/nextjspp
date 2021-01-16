import styled from "styled-components";
import { css } from "styled-components";
import { colors } from "styles/theme";

interface Props {
  bg?: string;
  margin?: string;
  borderRadius?: string;
  outline?: string;
  color?: string;
  disabled?: boolean;
  shadow?: string;
  hover?: boolean;
}

export default styled.button.attrs(() => ({}))<Props>`
  z-index: 0;
  position: relative;
  display: flex;

  margin: ${(p) => (p.margin ? p.margin : `0`)};
  padding: 0.4em 1em;

  overflow: hidden;
  cursor: pointer;

  border-width: 0;
  border-radius: ${(p) => (p.borderRadius ? p.borderRadius : `2px`)};
  outline: ${(p) => (p.outline ? p.outline : `none`)};
  box-shadow: ${(p) => {
    if (p.shadow) {
      if (p.shadow === "none") {
        return css`
        none
        `;
      } else {
        return css`
        0 1px 4px ${p.shadow}
        `;
      }
    } else {
      return css`
      0 1px 4px ${colors.primary.dark};
      `;
    }
  }};
  background-color: inherit;

  justify-content: center;
  align-items: center;

  line-height: 1.15em;
  font-weight: 700;
  font-size: 1em;

  ${(p) => {
    if (p.color) {
      return css`
        color: ${p.color};
      `;
    }
  }};

  transition: all 0.3s;

  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(p) => (p.bg ? p.bg : `${colors.primary.light}`)};
    filter: brightness(100%);
    transition: all 0.3s;
  }

  &:hover::before {
    ${(p) => {
      if (p.hover !== false) {
        return css`
          filter: brightness(75%);
          transition: all 0.3s;
        `;
      }
    }}
    ${(p) => {
      if (p.bg === "transparent") {
        return css`
          box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.75);
        `;
      }
    }}
  }

  &:active::before {
    filter: brightness(100%);
    transition: all 0.3s ease-out;
  }

  ${(p) => {
    if (p.disabled) {
      return css`
        cursor: auto;
        box-shadow: none;
        color: ${colors.bluegray[3]};
        &::before {
          background-color: ${colors.gray[4]};
        }
        &:hover::before {
          filter: brightness(100%);
        }
      `;
    }
  }}
`;
