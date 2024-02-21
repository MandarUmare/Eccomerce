
import { REMOVE_FROM_CART } from "../constants/cartConstants.JS";
import { SAVE_SHIPPING_INFO } from "../constants/cartConstants.JS";
import { ADD_TO_CART } from "../constants/cartConstants.JS";
import axios from "axios";

export const addtocart = (id, quantity) => async (dispatch) => {
  const token = localStorage.getItem("token");
  axios
    .get(`http://localhost:8000/product/getSingleproduct/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          product: response.data._id,
          name: response.data.name,
          price: response.data.price,
          image: response.data.images[0].url,
          stock: response.data.stock,
          quantity,
        },
      });

      console.log(response.data + "this is product details");
    });
};

export const removeFromCart = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      product: id,
    },
  });
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippinInfo",JSON.stringify(data));
};
