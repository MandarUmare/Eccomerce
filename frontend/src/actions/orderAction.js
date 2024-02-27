import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    console.log(order);

    const { data } = await axios.post(
      "https://multivendor-eccomerce.onrender.com/order/neworder",
      order,
      config
    );
    console.log(data);
    console.log("mandar");

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const token = localStorage.getItem("token");

    const { data } = await axios.get("https://multivendor-eccomerce.onrender.com/order/myOrders", {
      headers: {
        Authorization: token,
      },
    });

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `https://multivendor-eccomerce.onrender.com/order/getSingleOrder/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(
      "https://multivendor-eccomerce.onrender.com/order/admin/getAllOrders",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(data);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (id, order) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    
         
        
      
    };
    const { data } = await axios.put(`https://multivendor-eccomerce.onrender.com/order/admin/updateStatus/${id}`, order, config);

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`https://multivendor-eccomerce.onrender.com/order/admin/delete/${id}`,
    {
      headers: {
        Authorization: token,
      },
    });

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
