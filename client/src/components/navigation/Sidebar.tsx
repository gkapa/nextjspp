import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import Link from "next/link";

// Communication stuff
import { useRouter } from "next/router";

// Material-ui stuff
import NextLink from "next/link";
import CloseIcon from "@material-ui/icons/Close";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";

// Redux stuff
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userAction } from "store";
import { sidebarAction } from "store";
import { backdropAction } from "store";
import { RootState } from "store";

// Components
import { colors } from "styles/theme";
import menuItems from "./menuItems";
import Button from "atoms/Button";
import { vars } from "styles/theme";

const navbarMainColor = {
  home: colors.black,
  main: colors.bluegray[7],
};

export default function fun(props) {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  const [navbarColor, setNavbarColor] = React.useState(navbarMainColor.main);
  const [currentMenuItems, setCurrentMenuItems] = React.useState([]);
  const [menuItemsForAnime, setMenuItemsForAnime] = React.useState([]);

  const isSidebarHi = useSelector(
    (x: RootState) => x.sidebarReducer.isHi,
    shallowEqual,
  );

  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      setCurrentMenuItems([...menuItems.common, ...menuItems.authenticated]);
    } else {
      setCurrentMenuItems([...menuItems.common, ...menuItems.unAuthenticated]);
    }

    if (nextRouter.pathname === "/home") {
      setNavbarColor(navbarMainColor.home);
    } else {
      setNavbarColor(navbarMainColor.main);
    }
  }, [nextRouter.pathname]);

  const menuItemsAnime = React.useMemo(async () => {
    if (!isSidebarHi) {
      setMenuItemsForAnime([]);
      return;
    }

    const items = currentMenuItems;
    let curItems = [];

    for (const item of items) {
      await new Promise((x) => setTimeout(x, 100));
      curItems = [...curItems, item];
      setMenuItemsForAnime(curItems);
    }
  }, [isSidebarHi, currentMenuItems]);

  const handleOnClickMenuItem = React.useCallback((e) => {
    dispatch(sidebarAction.hi());
    dispatch(backdropAction.lo());
  }, []);

  return (
    <Wrapper active={isSidebarHi} bg={navbarColor}>
      <AppbarHeader>
        <Button
          shadow="none"
          bg="transparent"
          style={{ color: "white" }}
          onClick={() => dispatch(backdropAction.lo())}>
          <CloseIcon fontSize="large" style={{ marginRight: "0.8rem" }} />
          CLOSE
        </Button>
      </AppbarHeader>
      <AppbarBody>
        {menuItemsForAnime.map((e) => {
          if (e.link) {
            return (
              <NextLink key={e.name} href={e.link}>
                <a>
                  <Button
                    className="sidebar-btn"
                    bg="transparent"
                    shadow="none"
                    onClick={() => dispatch(backdropAction.lo())}>
                    {e.icon}
                    {e.name}
                  </Button>
                </a>
              </NextLink>
            );
          } else {
            return (
              <Button
                className="sidebar-btn"
                key={e.name}
                bg="transparent"
                shadow="none"
                onClick={() => {
                  dispatch(backdropAction.lo());
                  dispatch(userAction.logout());
                }}>
                {e.icon}
                {e.name}
              </Button>
            );
          }
        })}
      </AppbarBody>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs(() => ({}))<{
  active: boolean;
  bg: string;
}>`
  position: fixed;
  z-index: ${vars.zIndex.sidebar};
  top: 0;
  right: -100%;
  transition: 250ms;
  ${(p) =>
    p.active &&
    css`
      right: 0;
    `}
  width: 24rem;
  height: 100vh;

  padding: 1.8rem 2.8rem;
  background-color: ${(p) => p.bg};
`;

const AppbarHeader = styled.div`
  display: flex;
  align-items: center;

  font-size: 1.8rem;
`;

const AppbarBody = styled.div`
  margin-top: 4rem;

  display: flex;
  flex-direction: column;

  .sidebar-btn {
    position: relative;

    margin: 0.4rem 0;

    font-size: 1.8rem;
    color: white;

    overflow: visible;
    white-space: nowrap;

    .icon {
      margin-right: 0.4rem;
      vertical-align: middle;
      font-size: 1.8rem;
    }

    animation: sidebarBtnAnime 0.5s ease 0s 1 forwards;
    @keyframes sidebarBtnAnime {
      from {
        transform: translate(10rem, 0);
        opacity: 0.2;
        color: crimson;
      }
      to {
      }
    }
  }
`;
