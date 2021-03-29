import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/userAction";
import { UserAction } from "../_actions/types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default userReducer;
