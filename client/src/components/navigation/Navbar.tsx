import React from "react";
import styled from "styled-components";

// Communication stuff
import NextLink from "next/link";
import { useRouter } from "next/router";

// Redux stuff
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userAction } from "store";
import { backdropAction } from "store";
import { RootState } from "store";
import { sidebarAction } from "store";

// Material-ui stuff
import MenuIcon from "@material-ui/icons/Menu";

// Components
import Sidebar from "./Sidebar";
import menuItems from "./menuItems";
import { colors } from "styles/theme";
import { vars } from "styles/theme";
import Hide from "atoms/Hide";
import Button from "atoms/Button";

const navbarMainColor = {
  home: "transparent",
  main: colors.bluegray[7],
};

export default function fun(props) {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  const [currentMenuItems, setCurrentMenuItems] = React.useState([]);
  const [linksHighlighterLeft, setLinksHighlighterLeft] = React.useState("0");
  const [navbarColor, setNavbarColor] = React.useState(navbarMainColor.main);
  const [navbarPosition, setNavbarPosition] = React.useState("relative");

  const refs = {
    links: React.useRef<any>({}),
    linksHighlighter: React.useRef<any>(),
    test: React.useRef<any>(),
  };

  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  // set menu items
  React.useEffect(() => {
    if (isAuthenticated) {
      setCurrentMenuItems([...menuItems.common, ...menuItems.authenticated]);
    } else {
      setCurrentMenuItems([...menuItems.common, ...menuItems.unAuthenticated]);
    }
  }, [isAuthenticated]);

  // set navbar state by pathname
  React.useEffect(() => {
    if (nextRouter.pathname === "/home") {
      setNavbarColor(navbarMainColor.home);
      setNavbarPosition("absolute");
    } else {
      setNavbarColor(navbarMainColor.main);
      setNavbarPosition("relative");
    }
  }, [nextRouter.pathname]);

  // move link highlighter
  React.useEffect(() => {
    if (!Object.keys(refs.links.current)) return;
    let left = 0;

    for (const helper in refs.links.current) {
      if (!refs.links.current[helper]) continue;
      left = refs.links.current[helper].offsetLeft;
      left += refs.links.current[helper].offsetWidth >> 1;
      if (nextRouter.pathname === "/home") {
        if (nextRouter.query.pos) {
          if (nextRouter.query.pos === helper) break;
        } else {
          if (nextRouter.pathname === helper) break;
        }
      } else {
        if (nextRouter.pathname.match(new RegExp(`^${helper}`)) !== null) break;
      }
    }
    setLinksHighlighterLeft(left.toString() + `px`);
  }, [currentMenuItems, nextRouter.pathname, nextRouter.query]);

  return (
    <Wrapper position={navbarPosition} bg={navbarColor}>
      <Appbar>
        <div className="appbar-left">
          <div className="appbar-logo">
            <NextLink href="/home">
              <a className="inherit" style={{ color: "white" }}>
                <h1>HSH</h1>
              </a>
            </NextLink>
          </div>
        </div>

        <div className="appbar-right">
          <Hide when="lessThanTablet">
            <LinksBox>
              <LinksHighlighter
                ref={refs.linksHighlighter}
                style={{ left: linksHighlighterLeft }}></LinksHighlighter>
              {currentMenuItems.map((e) => {
                if (e.link) {
                  return (
                    <NextLink key={e.name} href={e.link}>
                      <a ref={(el) => (refs.links.current[e.linkHelper] = el)}>
                        <Button
                          bg="transparent"
                          color="white"
                          shadow="none"
                          borderRadius={"50%"}>
                          {e.name}
                        </Button>
                      </a>
                    </NextLink>
                  );
                } else {
                  return (
                    <Button
                      key={e.name}
                      bg="transparent"
                      color="white"
                      shadow="none"
                      borderRadius={"50%"}
                      onClick={() => dispatch(userAction.logout())}>
                      {e.name}
                    </Button>
                  );
                }
              })}
            </LinksBox>
          </Hide>
          <Button
            shadow="transparent"
            bg="transparent"
            color="white"
            onClick={() => {
              dispatch(sidebarAction.hi());
              dispatch(backdropAction.hi(sidebarAction.lo()));
            }}>
            <MenuIcon></MenuIcon>
          </Button>
        </div>
      </Appbar>
      <NavbarLine>
        <hr className="Animation"></hr>
      </NavbarLine>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs(() => ({}))<any>`
  position: ${(p) => p.position};
  z-index: ${vars.zIndex.navbar};
  width: 100%;
  background-color: ${(p) => p.bg};
  transition: all 0.5s;
`;

const Appbar = styled.div.attrs(() => ({}))<any>`
  position: relative;
  width: 100%;
  max-width: ${(p) => p.theme.vars.maxWidth.main};
  height: 3.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(p) => p.bg};

  .appbar-left {
  }

  .appbar-logo {
    margin-left: 1rem;
    font-family: "Hanalei Fill", cursive, sans-serif;
    color: black;
  }

  .appbar-right {
    display: flex;
    align-items: center;
    margin-right: 2.5rem;
  }
`;

const LinksBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const highlighterColor = colors.deeporange[5];

const LinksHighlighter = styled.div.attrs(() => ({}))<any>`
  position: absolute;
  left: 0px;
  top: 50%;
  width: 2.2rem;
  height: 2.2rem;
  border: 2px solid ${highlighterColor};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  &::before {
    position: absolute;
    content: "";
    left: 50%;
    top: 50%;
    width: 70%;
    height: 70%;
    transform: translate(-50%, -50%);
    border: 2px solid ${highlighterColor};
    border-radius: 50%;
  }

  animation: LinksHighlighter 1s ease 0.5s infinite alternate;
  @keyframes LinksHighlighter {
    from {
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

const NavbarLine = styled.div`
  position: relative;
  width: 100%;
  height: 5px;

  .Animation {
    position: absolute;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100%;

    background-color: ${colors.bluegray[6]};
    box-shadow: 0px 1px 4px black;

    animation: NavbarLine 1s ease 0.3s 1 forwards;
    @keyframes NavbarLine {
      from {
        left: -100%;
      }
      to {
        left: 0%;
      }
    }
  }
`;
