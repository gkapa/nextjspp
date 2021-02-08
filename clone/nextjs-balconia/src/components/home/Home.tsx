import React from "react";
import styled from "styled-components";

import { shallowEqual, useSelector } from "react-redux";
import { RootState, navbarActions } from "store";
import { useDispatch } from "react-redux";

import { colors, vars } from "styles/theme";

export default function fun() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async function () {
      // 처음에 녹색의 100wh 100vh 화면 표시. navbar는 hidden 상태
      dispatch(navbarActions.hide());

      // blur 씌워진 흰색 글자가 점점 작아지는 효과
      await new Promise((x) => setTimeout(x, 200));

      // 녹색 화면에서 메인이미지로 이미지가 바뀌며, 글자는 흑색으로 바뀜
      await new Promise((x) => setTimeout(x, 200));

      // 메인이미지가 우측으로 축소되면서 이동됨
      await new Promise((x) => setTimeout(x, 200));

      document.getElementById("main-img-box").classList.toggle("anim");
      document.getElementById("main-img").classList.toggle("anim");
      await new Promise((x) => setTimeout(x, 200));
      dispatch(navbarActions.unHide());
    })();
  }, []);

  return (
    <Container>
      <MainArea>
        <div id="mainarea-main">
          <ImgBox id="main-img-box">
            <img id="main-img" alt="main_image" src="/home/mv_pc.png" />
          </ImgBox>
          <ContentBox>
            <div className="logo">
              <h1>XX</h1>
            </div>
            <div className="title">
              既成概念から自由になる。 <br />
              未発見の未来を描く。
            </div>
            <div className="comment">
              Break free from existing values. <br />
              Write a future yet undiscovered.
            </div>
          </ContentBox>
        </div>
        <div id="mainarea-text"></div>
      </MainArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const MainArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - ${vars.navbar.height});
  background-color: green;

  #mainarea-main {
    width: 100%;
    padding: 40px 0;
    flex-grow: 1;
  }

  #mainarea-text {
    width: 100%;
    height: 200px;
    background-color: violet;
  }
`;

const ContentBox = styled.div`
  position: relative;
  height: 100%;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .logo {
    background-color: yellow;
  }

  .title {
    color: white;
    font-size: 1.5rem;
    line-height: 1.6;

    animation: main-text-anime 2s 1 forwards;
    @keyframes main-text-anime {
      from {
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        transform: scale(1.5, 1.5);
      }
      to {
        text-shadow: 0 0 5px rgba(0, 0, 0, 0);
        transform: scale(1, 1);
      }
    }

    background-color: blue;
  }

  .comment {
    background-color: cyan;
  }
`;

const ImgBox = styled.div`
  position: absolute;
  left: 0;
  top: -${vars.navbar.height};
  width: 100%;
  height: 100vh;
  background-color: ${colors.cyan[9]};

  transition: all 2s;

  &.anim {
    top: 40px;
    left: 25%;
    width: 75%;
    height: calc(100% - 200px - 80px);
  }

  #main-img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    visibility: hidden;

    &.anim {
      visibility: visible;
    }
  }
`;
