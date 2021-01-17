import React from "react";
import styled from "styled-components";

// Communication stuff
import { useRouter } from "next/router";

// Material-ui stuff
import { makeStyles } from "@material-ui/core/styles";
import { MaterialTheme } from "styles/theme";
import TextField from "@material-ui/core/TextField";

// Redux stuff
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import { userAction } from "store";

// Components
import Button from "atoms/Button";
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
  const nextRouter = useRouter();

  const [signId, setSignId] = React.useState("");

  const refs = {
    email: React.useRef<any>(""),
    password: React.useRef<any>(""),
    confirmPassword: React.useRef<any>(""),
  };

  const { errors } = {
    errors: useSelector((x: RootState) => x.userReducer.errors, shallowEqual),
  };

  const isLoading = useSelector(
    (x: RootState) => x.userReducer.isLoading,
    shallowEqual,
  );

  React.useEffect(() => {
    dispatch({ type: userAction.CLEAR_ERRORS });
    console.log(nextRouter.pathname);
  }, []);

  const dispatch = useDispatch();

  const handleOnSubmit = React.useCallback((e) => {
    e.preventDefault();
    const submitData = {
      sign_id: refs.email.current.value.split(/@/)[0],
      email: refs.email.current.value,
      password: refs.password.current.value,
      confirm_password: refs.confirmPassword.current.value,
    };
    dispatch(userAction.signUp(submitData));
  }, []);

  const handleOnChange = React.useCallback(() => {}, []);

  return (
    <Wrapper>
      <form noValidate onSubmit={handleOnSubmit}>
        <TextField
          disabled
          id="signIdInput"
          name="signId"
          type="text"
          autoComplete="off"
          label="ID"
          placeholder="email"
          value={`${signId}`}
          helperText={errors.signId ? errors.sign_id : " "}
          error={errors.sign_id ? true : false}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ marginTop: "0.8rem", width: "100%" }}
        />
        <br />
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
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onBlur={() => {
            setSignId(refs.email.current.value.split(/@/)[0]);
          }}
          style={{ marginTop: "0.8rem", width: "100%" }}
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
          helperText={
            errors.password
              ? errors.password
              : "パスワードは6文字以上を入力してください。"
          }
          error={errors.password ? true : false}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ marginTop: "0.8rem", width: "100%" }}
        />
        <br />
        <TextField
          className={`${classes.hover}`}
          id="confirmPasswordInput"
          name="confirmPassword"
          type="password"
          autoComplete="current-password"
          label="パスワード確認"
          placeholder="もう一度パスワードを入力してください。"
          inputRef={refs.confirmPassword}
          defaultValue={refs.confirmPassword.current}
          helperText={errors.confirm_password ? errors.confirm_password : " "}
          error={errors.confirm_password ? true : false}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ marginTop: "0.8rem", width: "100%" }}
        />
        <br />
        <Button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading && <LoadingIndicator></LoadingIndicator>}
          アカウント作成
        </Button>
      </form>
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

    margin-top: 1.2rem;
    padding: 1rem;

    font-size: 1.2rem;
    color: white;
  }
`;
