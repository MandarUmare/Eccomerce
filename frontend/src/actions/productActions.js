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
  CLEAR_ERRORS,
} from "../constants/productConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getProducts = () => (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/product/filteredProduct", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
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
