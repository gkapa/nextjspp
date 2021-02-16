import React from "react";
import styled from "styled-components";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import { menuItems } from "./menuItems";
import { ListItemSecondaryAction } from "@material-ui/core";

const navbarHeight = "80px";

export default function fun(props) {
  return (
    <Container>
      <Appbar>
        <div id="navbar-laptop-logo">
          <a href="/" target="_self">
            <img src="/logos/logo-150.png" alt="logo" />
          </a>
          <p>
            IT の力で、ものづくりの現場に
            <br />
            新しい価値を創造する！
          </p>
        </div>
        <div id="navbar-laptop-menus">
          {menuItems.map((primary, idx) => {
            // name: "企業情報",
            // link: "/corporate",
            // links: [
            //   {
            //     name: "ビーイングについて",
            //     links: [
            //       {
            //         name: "ごあいさつ",
            //         link: "",
            //       },
            //       {
            //         name: "会社概要",
            //         link: "",
            //       }, ...
            return (
              <DropDownMenu key={idx}>
                <a
                  className="dropdown-link-head"
                  href={primary.link}
                  target="_self">
                  {primary.name}{" "}
                  {primary.links && (
                    <ExpandMoreIcon
                      className="icon"
                      style={{ verticalAlign: "middle" }}
                    />
                  )}
                </a>
                {primary.links && (
                  <div className="dropdown-container">
                    <div className="dropdown-container-primary">
                      <a
                        className="dropdown-link-primary"
                        href={primary.link}
                        target="_self">
                        {primary.name}{" "}
                        <DoubleArrowIcon
                          className="icon"
                          style={{ verticalAlign: "-5px" }}
                        />
                      </a>
                    </div>
                    {primary.links.map((secondary) => {
                      return (
                        <div className="dropdown-container-secondary">
                          <div className="title">
                            <a href={primary.link} target="_self">
                              <PlayCircleFilledIcon
                                className="icon"
                                style={{ verticalAlign: "-5px" }}
                              />
                              {secondary.name}
                            </a>
                          </div>
                          <hr />
                          <div className="body">
                            {secondary.links &&
                              secondary.links.map((tertiary) => {
                                return (
                                  <a href={tertiary.link} target="_self">
                                    {tertiary.name}
                                  </a>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </DropDownMenu>
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

const Appbar = styled.div`
  position: fixed;
  width: 100%;
  height: ${navbarHeight};

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

  #navbar-laptop-logo {
    display: flex;
    align-items: center;
    padding-left: 20px;

    p {
      padding: 0px 10px;
    }
  }

  #navbar-laptop-menus {
    display: flex;
    height: 100%;
  }
`;

const DropDownMenu = styled.div`
  a.dropdown-link-head {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 5px;

    color: gray;

    .icon {
      color: blue;
    }
  }

  div.dropdown-container {
    /* display: none; */
    display: flex;
    justify-content: space-around;
    position: absolute;

    top: 100%;
    left: 0%;
    width: 100vw;
    padding-top: 25px;

    background-color: white;
    border-top: 2px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

    div.dropdown-container-primary {
      padding-right: 40px;
      border-right: 1px solid rgba(0, 0, 0, 0.15);

      a.dropdown-link-primary {
        font-size: 1.8em;
        .icon {
          font-size: 1em;
        }
      }
    }

    div.dropdown-container-secondary {
      div.title {
      }

      a {
        font-size: 1.4em;

        .icon {
          font-size: 1em;
        }
      }

      hr {
        border-top: 1px solid rgba(0, 0, 0, 0.15);
        margin: 10px 0;
      }

      div.body {
        a {
          white-space: pre-wrap;
        }
      }

      a.body {
      }

      a.dropdown-link-secondary-body {
        max-width: 250px;
        padding: 5px 15px;
        white-space: pre-wrap;
      }
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);

    a.dropdown-link-head {
      color: blue;
    }

    div.dropdown-container {
      display: flex;

      a {
        transition: background-color 0.3s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
`;
