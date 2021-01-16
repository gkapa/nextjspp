import React from "react";
import styled from "styled-components";

// Communication stuff
import NextRouter from "next/router";
import NextLink from "next/link";
// import axios from 'axios';

// Material-ui stuff
import { makeStyles } from "@material-ui/core/styles";
import { MaterialTheme } from "styles/theme";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { shallowEqual } from "react-redux";
import { RootState } from "store";
import { userAction } from "store";

// Components
import Button from "atoms/Button";
// import DynamicWrapper from "atoms/DynamicWrapper";
import LoadingIndicator from "blocks/LoadingIndicator";

const styles = makeStyles((theme) => ({
  hover: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: MaterialTheme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: MaterialTheme.palette.primary.dark,
      },
    },
  },
}));

export default function fun(props) {
  const classes = styles();

  const refs = {
    email: React.useRef<any>(""),
    password: React.useRef<any>(""),
  };

  const errors = useSelector(
    (x: RootState) => x.userReducer.errors,
    shallowEqual,
  );

  const isLoading = useSelector(
    (x: RootState) => x.userReducer.isLoading,
    shallowEqual,
  );

  const dispatch = useDispatch();

  const handleOnSubmit = React.useCallback((e) => {
    e.preventDefault();
    const submitData = {
      email: refs.email.current.value,
      password: refs.password.current.value,
    };
    dispatch(userAction.signIn(submitData));
  }, []);

  return (
    <Wrapper>
      <h2 style={{ marginBottom: "0.8rem" }}>MEMBER LOGIN</h2>
      <span>
        アカウントをお持ちの方は
        <br />
        下記よりログインしてください。
      </span>
      <br />
      <form
        noValidate
        style={{ marginTop: "1.4rem" }}
        onSubmit={handleOnSubmit}>
        <TextField
          className={`${classes.hover}`}
          id="emailInput"
          name="email"
          type="email"
          autoComplete="email"
          label="Eメール"
          placeholder="email@email.com"
          inputRef={refs.email}
          defaultValue={refs.email.current}
          helperText={errors.email ? errors.email : " "}
          error={errors.email ? true : false}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ width: "100%" }}
        />
        <br />
        <TextField
          className={`${classes.hover}`}
          id="passwordInput"
          name="password"
          type="password"
          autoComplete="current-password"
          label="パスワード"
          placeholder="パスワードを入力してください。"
          inputRef={refs.password}
          defaultValue={refs.password.current}
          helperText={errors.password ? errors.password : " "}
          error={errors.password ? true : false}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ marginTop: "0.8rem", width: "100%" }}
        />
        <br />
        <Button
          className="submit-button"
          type="submit"
          disabled={isLoading}
          style={{ marginTop: "0.8rem" }}>
          {isLoading && <LoadingIndicator></LoadingIndicator>}
          <h2>ログイン</h2>
        </Button>
      </form>
      <div className="division-line">
        <hr />
        <p>アカウントを持っていない方</p>
        <hr />
      </div>
      <NextLink href="/join/signup">
        <Button className="signup-button" bg="gray">
          <h2>アカウントを作成</h2>
        </Button>
      </NextLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 540px;

  margin: 0 auto;
  margin-top: 5rem;
  border: 3px solid black;
  padding: 3rem 2.5rem;

  text-align: center;

  .submit-button {
    width: 100%;
    padding: 1rem;

    color: white;
  }

  .division-line {
    margin-top: 1.6rem;

    display: flex;
    align-items: center;

    justify-content: space-around;

    & > p {
      margin: 0 1.2rem;
    }

    & > hr {
      display: inline-block;
      flex-grow: 1;
    }
  }

  .signup-button {
    margin-top: 1.6rem;

    width: 100%;
    padding: 1rem;

    color: white;
  }
`;
