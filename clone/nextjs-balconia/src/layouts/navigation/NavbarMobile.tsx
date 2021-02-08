import React from "react";
import styled, { css } from "styled-components";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { RootState } from "store";
import { shallowEqual, useSelector } from "react-redux";

import { colors, vars } from "styles/theme";
import { menuItems } from "./menuItems";

export default function fun() {
  const [isHiMenuGuide, setIsHiMenuGuide] = React.useState<boolean>(false);

  const isNavbarHide = useSelector(
    (x: RootState) => x.navbarReducer.isHide,
    shallowEqual,
  );

  return (
    <Container isNavbarHide={isNavbarHide}>
      <div
        id="navbar-blank"
        style={{ width: "100%", height: `${vars.navbar.height}` }}
      />
      <Appbar isHi={isHiMenuGuide}>
        <div id="logo-area" className="fade fade-out">
          <a href="/" target="_self">
            <img className="corp-logo" alt="logo" src="ogp.png" />
          </a>
        </div>
        <div id="guide-area" style={{ textAlign: "right" }}>
          <button
            className="nav-opener"
            onClick={() => {
              setIsHiMenuGuide(!isHiMenuGuide);
            }}>
            {isHiMenuGuide ? (
              <CloseIcon className="fade fade-in close-icon" />
            ) : (
              <MenuIcon className="fade fade-out menu-icon" />
            )}
          </button>
        </div>
        <section id="menu-area" className="fade fade-in">
          {menuItems.map((item) => {
            return (
              <React.Fragment key={item.name}>
                {item.link && (
                  <a href={item.link} target="_self">
                    <MenuItem className="fade fade-in">{item.name}</MenuItem>
                  </a>
                )}
                {item.links && (
                  <>
                    <MenuItem className="fade fade-in">{item.name}</MenuItem>
                    {item.links.map((item) => {
                      return (
                        <a key={item.name} href={item.link} target="_self">
                          <MenuItem className="fade fade-in list">
                            {item.name}
                          </MenuItem>
                        </a>
                      );
                    })}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </section>
      </Appbar>
    </Container>
  );
}

const Container = styled.div.attrs(() => {})<{
  isNavbarHide: boolean;
}>`
  position: relative;
  width: 100%;

  & * {
    ${(p) =>
      p.isNavbarHide === true
        ? css`
            visibility: hidden;
          `
        : null};
  }
`;

const Appbar = styled.div.attrs(() => {})<{
  isHi: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${vars.navbar.height};

  background-color: ${(p) => (p.isHi ? `${colors.gray[8]}` : "transparent")};

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  transition: all 0.5s;

  .fade {
    transition: all 0.5s;

    &.fade-in {
      ${(p) =>
        !p.isHi
          ? css`
              opacity: 0;
              visibility: hidden;
            `
          : css`
              opaicty: 1;
              visibility: visible;
            `}
    }

    &.fade-out {
      ${(p) =>
        p.isHi
          ? css`
              opacity: 0;
              visibility: hidden;
            `
          : css`
              opaicty: 1;
              visibility: visible;
            `}
    }
  }

  .corp-logo {
    height: 70px;
    margin: 5px 30px;
  }

  .nav-opener {
    margin: 5px 30px;
    padding: 5px 30px;

    transition: all 2s;

    .menu-icon {
      font-size: 2rem;
      transform: scale(1.5, 1.2);
      color: ${colors.gray[8]};
    }

    .close-icon {
      font-size: 2rem;
      transform: scale(1.2);
      color: ${colors.gray[2]};
    }
  }

  #menu-area {
    position: absolute;
    top: 100%;
    width: 100%;
    grid-column: span 2;
    background-color: ${(p) => (p.isHi ? `${colors.gray[8]}` : "transparent")};
  }
`;

const MenuItem = styled.div`
  width: 100%;
  padding: 15px;
  padding-left: 30px;
  border-bottom: 1px solid ${colors.gray[5]};

  font-size: 1.6em;
  color: white;

  &.list {
    padding-left: 60px;
    background-color: ${colors.gray[9]};
  }
`;
