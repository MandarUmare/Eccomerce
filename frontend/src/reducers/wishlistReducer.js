import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../constants/wishListConstants";

export const wishlistReducer = (state = { wishlist: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        selected: true,
        wishlist: [...state.wishlist, action.payload],
      };

    case REMOVE_FROM_WISHLIST:
      console.log(action.payload);
      return {
        selected: false,
        wishlist: state.wishlist.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};
