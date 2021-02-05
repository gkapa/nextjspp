import React from "react";
import styled from "styled-components";

import Hide from "atoms/Hide";

export default function fun(props) {
  const [isHiMobileGuide, setIsHiMobileGuide] = React.useState<boolean>(false);

  return (
    <Wrapper>
      <h1>Script</h1>
      <Hide when={"greaterThanTablet"}>{isHiMobileGuide ? <></> : <></>}</Hide>
      <Hide when={"lessThanTablet"}></Hide>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
