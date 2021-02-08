import React from "react";
import styled, { css } from "styled-components";

import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "store";

import Hide from "atoms/Hide";
import { vars } from "styles/theme";

import NavbarLaptop from "./NavbarLaptop";
import NavbarMobile from "./NavbarMobile";

export default function fun(props) {
  return (
    <Container>
      <Hide when={"greaterThanTablet"}>
        <NavbarMobile />
      </Hide>
      <Hide when={"lessThanTablet"}>
        <NavbarLaptop />
      </Hide>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  z-index: ${vars.zIndex.navbar};
`;
