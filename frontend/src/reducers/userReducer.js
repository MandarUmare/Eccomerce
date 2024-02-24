import { SAVE_USER_INFO ,REMOVE_USER_INFO } from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SAVE_USER_INFO:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case REMOVE_USER_INFO:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
