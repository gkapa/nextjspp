import React from "react";
import styled from "styled-components";

// Material-ui stuff
import GitHubIcon from "@material-ui/icons/GitHub";

import { colors } from "styles/theme";

export default function fun(props) {
  React.useEffect(() => {
    // console.log(nextRouter.pathname);
  });

  return (
    <Wrapper>
      <div>
        Ⓒ 2021 HAN SAHYEON. <br />
        ALL RIGHTS RESERVED.
      </div>
      <div>
        <GitHubIcon
          style={{ verticalAlign: "middle", marginRight: "0.4rem" }}
        />
        <a className="underline" href="http://github.com/gkapa/nextjspp">
          github.com/gkapa/nextjspp
        </a>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 7rem;
  border-top: 1px solid ${colors.gray[5]};
  padding-top: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div:not(:first-child) {
    margin-left: 4rem;
  }
`;
