import React from "react";
import styled, { css } from "styled-components";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { colors } from "styles/theme";
import { menuItems } from "./menuItems";

export default function fun() {
  const [isHiMenuGuide, setIsHiMenuGuide] = React.useState<boolean>(false);

  return (
    <Container>
      <Appbar isHi={isHiMenuGuide}>
        <div>
          {!isHiMenuGuide && (
            <a href="/" target="_self">
              <img className="corp-logo" alt="logo" src="ogp.png" />
            </a>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            className="nav-opener"
            onClick={() => {
              setIsHiMenuGuide(!isHiMenuGuide);
            }}>
            {isHiMenuGuide ? (
              <CloseIcon className="close-icon" />
            ) : (
              <MenuIcon className="menu-icon" />
            )}
          </button>
        </div>
        {isHiMenuGuide && (
          <section style={{ gridColumn: "span 2", width: "100%" }}>
            {menuItems.map((item) => {
              return (
                <React.Fragment key={item.name}>
                  <MenuItem>{item.name}</MenuItem>
                </React.Fragment>
              );
            })}
            <ul></ul>
          </section>
        )}
      </Appbar>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Appbar = styled.div.attrs(() => {})<{
  isHi: boolean;
}>`
  position: relative;
  padding: 3px 20px;

  background-color: ${(p) => (p.isHi ? `${colors.gray[6]}` : "transparent")};

  transition: all 0.4s;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .corp-logo {
    width: 80px;
    margin-left: 20px;
  }

  .nav-opener {
    padding: 5px 30px;

    .menu-icon {
      font-size: 2rem;
      transform: scale(1.5, 1.2);
      color: ${colors.gray[8]};
    }

    .close-icon {
      font-size: 2rem;
      transform: scale(1.2);
      color: ${colors.gray[8]};
    }
  }
`;

const MenuItem = styled.ul`
  width: 100%;
  border-bottom: 1px solid ${colors.bluegray[6]};

  font-size: 1.6em;

  li {
    background-color: ${colors.gray[7]};
  }
`;
