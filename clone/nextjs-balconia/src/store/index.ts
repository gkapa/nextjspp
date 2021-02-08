import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import navbarReducer, * as navbarActions from "./redux/navbar";

export { navbarActions };

const rootReducer = combineReducers({
  navbarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(reduxThunk));
  return store;
}

export const store = configureStore();
