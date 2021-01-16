import HomeIcon from "@material-ui/icons/Home";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AirplayIcon from "@material-ui/icons/Airplay";

interface Props {
  name: string;
  link?: string;
  event?: string;
  linkHelper?: string;
  label?: string;
  icon?: any;
}

const initialState: Props = {
  name: "",
};

const common: Props[] = [
  {
    ...initialState,
    name: "HOME",
    link: "/home",
    linkHelper: "/home",
    icon: <HomeIcon className="icon" />,
  },
  {
    ...initialState,
    name: "INTRODUCE",
    link: "/home?pos=introduce",
    linkHelper: "introduce",
    icon: <ChatBubbleOutlineIcon className="icon" />,
  },
  {
    ...initialState,
    name: "SKILL",
    link: "/home?pos=skill",
    linkHelper: "skill",
    icon: <HomeIcon className="icon" />,
  },
  {
    ...initialState,
    name: "DASH BOARD",
    link: "/community/list?page=1",
    linkHelper: "/community",
    icon: <HowToRegIcon className="icon" />,
  },
];

const authenticated: Props[] = [
  {
    ...initialState,
    name: "LOGOUT",
    event: "logout",
    icon: <HomeIcon className="icon" />,
  },
];

const unAuthenticated: Props[] = [
  {
    ...initialState,
    name: "LOGIN",
    link: "/join/signin",
    linkHelper: "/join/signin",
    icon: <ExitToAppIcon className="icon" />,
  },
  {
    ...initialState,
    name: "SIGN UP",
    link: "/join/signup",
    linkHelper: "/join/signup",
    icon: <AirplayIcon className="icon" />,
  },
];

export default {
  common,
  authenticated,
  unAuthenticated,
};
