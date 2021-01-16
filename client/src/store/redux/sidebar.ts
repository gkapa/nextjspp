const HI = "sidebar/HI" as const;
const LO = "sidebar/LO" as const;

export const hi = () => ({
  type: HI,
});
export const lo = () => ({
  type: LO,
});

type Action = ReturnType<typeof hi | typeof lo>;

interface State {
  isHi: boolean;
}

const initialState = {
  isHi: false,
};

export default function fun(state: State = initialState, action: Action) {
  switch (action.type) {
    case HI:
      return {
        ...state,
        isHi: true,
      };
    case LO:
      return {
        ...state,
        isHi: false,
      };
    default:
      return state;
  }
}
