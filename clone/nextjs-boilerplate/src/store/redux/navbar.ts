const HIDE = "navbar/HI" as const;
const UNHIDE = "navbar/LO" as const;

export const hide = () => ({
  type: HIDE,
});
export const unHide = () => ({
  type: UNHIDE,
});

type Action = ReturnType<typeof hide | typeof unHide>;

interface State {
  isHide: boolean;
}

const initialState: State = {
  isHide: true,
};

export default function fun(state = initialState, action: Action) {
  switch (action.type) {
    case HIDE:
      return {
        ...state,
        isHide: true,
      };
    case UNHIDE:
      return {
        ...state,
        isHide: false,
      };
    default:
      return state;
  }
}
