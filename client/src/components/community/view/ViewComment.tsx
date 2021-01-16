import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
// import NextLink from "next/link";
// import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
import CreateIcon from "@material-ui/icons/Create";
import TurnedInIcon from "@material-ui/icons/TurnedIn";

// Redux stuff
import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { RootState } from "store";

// Components
import Button from "atoms/Button";
import { colors } from "styles/theme";

export default function fun(props) {
  const nextRouter = useRouter();

  const [commentsData, setCommentsData] = React.useState<any>([]);

  const refs = {
    newCommentBody: React.useRef<any>(""),
    isGetCommentsFetching: React.useRef<boolean>(false),
    isAddCommentFetching: React.useRef<boolean>(false),
  };

  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  const credentials = useSelector(
    (x: RootState) => x.userReducer.credentials,
    shallowEqual,
  );

  React.useEffect(() => {
    getCommentsFromPage();
  }, []);

  const getCommentsFromPage = React.useCallback(() => {
    if (refs.isGetCommentsFetching.current) return;
    refs.isGetCommentsFetching.current = true;
    (async function () {
      try {
        const commentsQry = await axios.get(
          `/api/comments/getcommentsfrompost/${nextRouter.query.idx}`,
        );
        setCommentsData(commentsQry.data);
      } catch (err) {
        const res = err.response.data;
        console.error(res);
      } finally {
        refs.isGetCommentsFetching.current = false;
      }
    })();
  }, []);

  const handleOnClickCreateComment = React.useCallback(async () => {
    if (refs.isAddCommentFetching.current) return;
    refs.isAddCommentFetching.current = true;
    (async function () {
      try {
        const reqData = {
          body: refs.newCommentBody.current.value,
        };

        await axios.post(
          `/api/comments/addcommenttopost/${nextRouter.query.idx}`,
          reqData,
        );

        refs.newCommentBody.current.value = "";

        // console.log(`comment added to ${nextRouter.query.idx}`);
        getCommentsFromPage();
      } catch (err) {
        const res = err.response.data;
        console.error(res);

        if (res.body_length) alert(`2文字以上、150文字以下で入力してください`);
        if (res.fb_auth) alert(`ログインが必要です`);
      } finally {
        refs.isAddCommentFetching.current = false;
      }
    })();
  }, []);

  return (
    <Wrapper>
      <hr style={{ borderTop: `1px solid ${colors.bluegray[8]}` }} />
      <Comments>
        <p style={{ fontWeight: 700 }}>
          コメント{" "}
          <span style={{ color: "red" }}>{props.ssp.postData.comment_cnt}</span>
          個
        </p>
        <hr />
        {commentsData.map((data, idx) => (
          <section key={idx} className="comment">
            <div className="donor">
              {data.donor}
              <TurnedInIcon className="icon" fontSize="small" />
            </div>
            <div className="body">{data.body}</div>
            <div className="time">{data.created_at}</div>
          </section>
        ))}
        <hr />
      </Comments>
      <NewComment>
        <section className="comment">
          <div className={`donor ${isAuthenticated ? "authenticated" : null}`}>
            {credentials.sign_id ? credentials.sign_id : "ログインが必要です"}
          </div>
          <textarea
            ref={refs.newCommentBody}
            className="body"
            placeholder="コメントを入力してください"></textarea>
        </section>
        <div className="buttons">
          <Button
            className="submit"
            onClick={() => handleOnClickCreateComment()}>
            <CreateIcon className="icon" />
            登録
          </Button>
        </div>
      </NewComment>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;

  margin-top: 1.2rem;

  .icon {
    vertical-align: middle;
  }
`;

const Comments = styled.div`
  margin-top: 0.8rem;
  hr {
    border-top: 2px solid ${colors.lightblue[9]};
  }

  font-size: 1rem;

  & > .comment {
    margin: 0.4rem 0px;
    border-bottom: 1px solid ${colors.border.main};

    display: flex;
    align-items: flex-start;
  }

  .donor {
    width: 5.5rem;

    .icon {
      color: gray;
    }
  }

  .body {
    flex-grow: 1;
    white-space: pre-wrap;
  }

  .time {
    width: 10rem;
    color: ${colors.gray[6]};
  }
`;

const NewComment = styled.div`
  margin-top: 0.8rem;
  border-top: 2px solid ${colors.lightblue[9]};
  border-bottom: 2px solid ${colors.lightblue[9]};
  padding: 0.8rem 0;

  font-size: 1rem;

  & > .comment {
    display: flex;
    align-items: flex-start;

    .donor {
      border: 1px solid ${colors.border.main};
      padding: 0.25rem;

      display: inline-block;
      width: 10rem;

      vertical-align: middle;

      background-color: rgba(0, 0, 0, 0.2);
      &.authenticated {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    .body {
      flex-grow: 1;
      height: 5rem;

      margin-left: 0.6rem;
      border: 1px solid ${colors.border.main};
      padding: 0.25rem;

      font-size: 1.1rem;
    }
  }

  & > .buttons {
    display: flex;
    justify-content: flex-end;

    .submit {
      padding: 0.25rem 1.2rem;
      margin-top: 0.4rem;

      font-size: 1.05rem;
      color: white;
    }
  }
`;
