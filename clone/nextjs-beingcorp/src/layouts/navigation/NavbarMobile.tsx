import React from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import HamburgerButton from "atoms/HamburgerButton";
import { menuItems } from "./menuItems";
import { colors } from "styles/theme";

const navbarHeight = "80px";

export default function fun(props) {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log({ isOpened: isOpened });
  }, [isOpened]);

  return (
    <Container id="navbar-container-mobile">
      <Appbar isOpened={isOpened}>
        <div id="navbar-mobile-logo">
          <a href="/" target="_self">
            <img src="/logos/logo-150.png" alt="logo" />
          </a>
        </div>
        <div id="navbar-mobile-menu-button">
          <Button
            className="button"
            onClick={() => {
              setIsOpened(!isOpened);
            }}>
            <HamburgerButton
              width={30}
              height={30}
              isOpened={isOpened}></HamburgerButton>
          </Button>
        </div>
        <div id="navbar-mobile-menus">
          {menuItems.map((item, idx) => {
            return (
              <a key={idx} href={`${item.link}`} target="_self">
                <div>{item.name}</div>
                <ExpandMoreIcon />
              </a>
            );
          })}
        </div>
      </Appbar>
      <div id="navbar-blank" />
    </Container>
  );
}

const Container = styled.div`
  #navbar-blank {
    width: 100%;
    height: ${navbarHeight};
  }
`;

const Appbar = styled.div.attrs(() => {})<{
  isOpened: boolean;
}>`
  position: fixed;
  width: 100%;
  height: ${navbarHeight};

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;

  #navbar-mobile-logo {
    margin: auto 0;
    margin-left: 20px;

    img {
      width: 140px;
    }
  }

  #navbar-mobile-menu-button {
    text-align: right;
    margin: auto 0;
    margin-right: 20px;

    .button {
      height: ${navbarHeight};
      width: ${navbarHeight};
    }
  }

  #navbar-mobile-menus {
    visibility: ${(p) => (p.isOpened ? "visible" : "hidden")};

    position: absolute;
    top: 100%;
    width: 100%;

    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

    a {
      position: relative;
      width: 100%;
      padding: 5px 0;

      display: flex;
      align-items: center;

      & > :nth-child(1) {
        margin-left: 20px;
        flex-grow: 1;
        color: gray;
      }

      & > :nth-child(2) {
        margin-right: 20px;
        color: blue;
      }

      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all 0.3s;
      }

      &:hover {
        & > :nth-child(1) {
          color: blue;
        }

        &:before {
          background-color: rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
`;
