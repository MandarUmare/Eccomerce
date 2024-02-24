import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  CLEAR_ERRORS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from "../constants/productConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getProducts = (name) => (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/product/filteredProduct?category=${name}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("phone");
        console.log(response.data.data);
        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: response.data.data });
      })
      .catch((err) => {
        dispatch({ type: ALL_PRODUCT_FAIL });

        toast.error("Products not found");
      });
  } catch (error) {
    dispatch({ type: ALL_PRODUCT_FAIL, payload: error });
  }
};

export const getAdminProducts = () => (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/product/adminProduct", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch({
          type: ADMIN_PRODUCT_SUCCESS,
          payload: response.data.product,
        });
      })
      .catch((err) => {
        dispatch({ type: ADMIN_PRODUCT_FAIL });

        toast.error("Products not found");
      });
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const token = localStorage.getItem("token");
    await axios
      .get(`http://localhost:8000/product/getSingleproduct/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data });
        console.log("Jai Shree Ram ");
        console.log(response.data);
      })
      .catch((err) => {
        dispatch({ type: PRODUCT_DETAILS_FAIL });

        toast.error("Product not found");
      });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");
    await axios
      .delete(`http://localhost:8000/product/admin/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: response.data.success,
        });
        console.log("Jai Shree Ram ");
        console.log(response.data);
      })
      .catch((err) => {
        dispatch({ type: DELETE_PRODUCT_FAIL });

        toast.error("Product not found");
      });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
    });
  }
};

export const searchProduct = (keyword) => (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/product/find/${keyword}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: SEARCH_PRODUCT_FAIL });

        toast.error("Product not found");
      });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  console.log(reviewData);
  console.log("");
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:8000/product/addReview`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:8000/product/admin/createproduct`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  console.log(id);
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:8000/product/admin/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
