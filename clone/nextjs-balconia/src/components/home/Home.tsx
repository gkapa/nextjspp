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
      await new Promise((x) => setTimeout(x, 500));

      // blur 씌워진 흰색 글자가 나타나고, 점점 작아지는 효과
      document.getElementById("main-title").classList.add("init-ready");
      await new Promise((x) => setTimeout(x, 2000));

      // 녹색 화면에서 메인이미지로 이미지가 바뀌며, 글자는 흑색으로 바뀜
      document.getElementById("main-title").classList.add("img-ready");
      document.getElementById("main-img").classList.add("img-ready");
      await new Promise((x) => setTimeout(x, 2000));

      // 메인이미지가 우측으로 축소되면서 이동됨

      await new Promise((x) => setTimeout(x, 200));
      document
        .getElementById("main-img-box")
        .classList.add("imgbox-moving-ready");

      // navbar를 애니메이션과 함께 이동시킴
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
            <div id="main-logo">
              <h1>XX</h1>
            </div>
            <div id="main-title">
              既成概念から自由になる。 <br />
              未発見の未来を描く。
            </div>
            <div id="main-comment">
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

  #main-logo {
    background-color: yellow;
  }

  #main-title {
    font-size: 1.5rem;
    line-height: 1.6;

    visibility: hidden;
    &.init-ready {
      visibility: visible;

      animation: main-text-init 1s 1 forwards;
      color: white;
      @keyframes main-text-init {
        0% {
          color: transparent;
          transform: scale(1.5, 1.2);
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }
        100% {
        }
      }
    }
    &.img-ready {
      animation: main-text-ready 2s 1 forwards;
      @keyframes main-text-ready {
        to {
          color: black;
        }
      }
    }
  }

  #main-comment {
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

  &.imgbox-moving-ready {
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

    &.img-ready {
      visibility: visible;
      animation: main-img 2s 1 forwards;
      @keyframes main-img {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
`;
