import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import backdropReducer, * as backdropAction from "./redux/backdrop";
import sidebarReducer, * as sidebarAction from "./redux/sidebar";
import userReducer, * as userAction from "./redux/user";
import uiReducer, * as uiAction from "./redux/ui";

export { sidebarAction, backdropAction, userAction, uiAction };

const rootReducer = combineReducers({
  sidebarReducer,
  backdropReducer,
  userReducer,
  uiReducer,
});

// redux의 TypeScript type
export type RootState = ReturnType<typeof rootReducer>;

function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(reduxThunk));
  return store;
}

export const store = configureStore();
