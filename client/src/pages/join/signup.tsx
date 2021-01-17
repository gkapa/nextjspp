import React from "react";
// import styled from "styled-components";

// Communication stuff
import { useRouter } from "next/router";

// Components
import SignUp from "components/join/signup/SignUp";

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  });

  return (
    <>
      <SignUp></SignUp>
    </>
  );
}

// const Wrapper = styled.div``;
