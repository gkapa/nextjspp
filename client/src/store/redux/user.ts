import axios from "axios";
import NextRouter from "next/router";
import Cookies from "util/CookieHandler";

export const SET_LOADING = "user/SET_LOADING" as const;
export const SET_ERRORS = "user/SET_ERRORS" as const;
export const CLEAR_ERRORS = "user/CLEAR_ERRORS" as const;
export const SET_USER = "user/SET_USER" as const;
export const SET_AUTHENTICATED = "user/SET_AUTHENTICATED" as const;
export const SET_UNAUTHENTICATED = "user/SET_UNAUTHENTICATED" as const;
export const MARK_NOTIFICATIONS_READ = "user/MARK_NOTIFICATIONS_READ" as const;
export const LIKE_SCREAM = "user/LIKE_SCREAM" as const;
export const UNLIKE_SCREAM = "user/UNLIKE_SCREAM" as const;

interface State {
  isLoading: boolean;
  errors: object;
  isAuthenticated: boolean;
  credentials: object;
  likes: [];
  notifications: [];
}

const initialState: State = {
  isLoading: false,
  errors: {},
  isAuthenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export const setAuthorizationHeader = (token) => (dispatch) => {
  const cookies = new Cookies();
  cookies.set("fbIdToken", token, { path: "/" });
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch(setAuthenticated());
};

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED,
});

export const removeAuthorizationHeader = () => (dispatch) => {
  const cookies = new Cookies();
  cookies.remove("fbIdToken", { path: "/" });
  cookies.remove("fbIdToken", { path: `${window.location.pathname}` });
  delete axios.defaults.headers.common["Authorization"];
  dispatch(setUnAuthenticated());
  // console.log("removed axios header and cookie");
};

export const setUnAuthenticated = () => ({
  type: SET_UNAUTHENTICATED,
});

export const logout = () => (dispatch) => {
  dispatch(removeAuthorizationHeader());
  window.location.reload();
};

export const setUser = (userDetailsData) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: userDetailsData,
  });
};

export const signUp = (userData) => async (dispatch) => {
  try {
    // console.log({ "signup submit data": userData });
    dispatch({ type: SET_LOADING });
    const signUpQry = await axios.post("/api/users/signup", userData);

    dispatch({ type: CLEAR_ERRORS });
    NextRouter.push("/join/signin");
    alert("アカウントが作成されました。");
  } catch (err) {
    console.error({ err });
    const res = err.response.data;
    let errors: any = {};

    console.log({ res: res });

    // if (res.signId) errors.signId = ""
    if (res.email || res.sign_id) {
      errors.email = "正しいEメール入力してください。";
      if (res.sign_id) {
        errors.email += "英語の小文字のみを入力してください。";
      }
    }
    if (res.password) {
      errors.password = "正しいパスワードをく入力してください。";
      errors.password += "パスワードは6文字以上を入力してください。";
    }
    if (res.confirm_password)
      errors.confirm_password = "パスワードが一致してないです。";

    if (res.code) {
      let msg = "";
      switch (res.code) {
        case "registered":
          msg = "既に登録されているIDです。";
          errors.sign_id = msg;
          break;
        case "auth/email-already-in-use":
          msg = "既に登録されているEメールです。";
          errors.email = msg;
          break;
        default:
          msg = "未設定エラーです。";
          msg += `\nERROR CODE: ${res.code}`;
          break;
      }
      alert(msg);
    }

    dispatch({
      type: SET_ERRORS,
      payload: errors,
    });
  }
};

export const signIn = (userData) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });

    const signInQry = await axios.post("/api/users/signin", userData);
    dispatch(setAuthorizationHeader(signInQry.data.token));

    const userDetailsQry = await axios.post("/api/users/getuserdetails");
    dispatch(setUser(userDetailsQry.data));

    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    console.error(err);
    const res = err.response.data;
    let errors: any = {};

    if (res.email) errors.email = "Eメールを正しく入力してください。";
    if (res.password) errors.password = "パスワードを正しく入力してください。";

    if (res.code) {
      let msg = "";
      switch (res.code) {
        case "auth/user-not-found":
          msg = "登録されていないユーザメールです。";
          errors.email = msg;
          break;
        case "auth/wrong-password":
          msg = "パスワードを確認してください。";
          errors.password = msg;
          break;
        case "auth/too-many-requests":
          msg =
            "このアカウントは多数のログイン失敗のため一時的にロックされました。";
          msg += "\n時間をおいて再度ログインしてください。";
          break;
        default:
          msg = "未設定エラーです。";
          msg += `\nERROR CODE: ${res.code}`;
          break;
      }
      alert(msg);
    }

    dispatch({
      type: SET_ERRORS,
      payload: errors,
    });
  }
};

export default function fun(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        isLoading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
        isLoading: false,
      };
    case SET_AUTHENTICATED:
      console.log(action.type);
      return {
        ...state,
        isAuthenticated: true,
      };
    case SET_UNAUTHENTICATED:
      console.log(action.type);
      return {
        ...state,
        isAuthenticated: false,
      };
    case SET_USER:
      console.log(action.type);
      return {
        ...state,
        isAuthenticated: true,
        credentials: action.payload.credentials,
      };
    default:
      return state;
  }
}
