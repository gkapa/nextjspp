import React from "react";
import styled from "styled-components";

import Hide from "atoms/Hide";

import NavbarLaptop from "./NavbarLaptop";
import NavbarMobile from "./NavbarMobile";

export default function fun(props) {
  return (
    <Wrapper>
      <Hide when={"greaterThanTablet"}>
        <NavbarMobile />
      </Hide>
      <Hide when={"lessThanTablet"}>
        <NavbarLaptop />
      </Hide>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
