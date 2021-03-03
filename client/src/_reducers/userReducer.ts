import { LOGIN_USER } from "../_actions/userAction";
import { UserAction } from "../_actions/types";

const userReducer = (state = {}, action: UserAction) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
};

export default userReducer;
