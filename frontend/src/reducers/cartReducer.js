import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants.js";

export const cartReducer = (state = { cartItems: [] ,shippingInfo:{}}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isExist = state.cartItems.find((i) => i.product === item.product);
      console.log(isExist + "isExist");
      if (isExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isExist.product ? item : i
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.product !== action.payload.product
        ),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
