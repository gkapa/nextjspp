import React from "react";
import styled from "styled-components";

import Hide from "atoms/Hide";
import NavbarMobile from "./NavbarMobile";
import NavbarLaptop from "./NavbarLaptop";

export default function fun(props) {
  return (
    <Container>
      <Hide when="greaterThanTablet">
        <NavbarMobile />
      </Hide>
      <Hide when="lessThanTablet">
        <NavbarLaptop />
      </Hide>
    </Container>
  );
}

const Container = styled.div``;
