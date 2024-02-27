import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../constants/wishListConstants";
import axios from "axios";

export const addtowishlist = (id) => (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .get(`https://multivendor-eccomerce.onrender.com/product/getSingleproduct/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      console.log(response.data);
      console.log("fkjbska");
      dispatch({
        type: ADD_TO_WISHLIST,
        payload: {...response.data,selected:true},
      });
    });
};

export const removeFromWishlist = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST,
    payload: id,
  });
};
