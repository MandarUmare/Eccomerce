import axios from "axios";
import {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  SAVE_USER_INFO,
  REMOVE_USER_INFO,
  CLEAR_ERRORS,
} from "../constants/userConstants.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { compose } from "redux";

export const saveUser = (user) => (dispatch) => {
  dispatch({
    type: SAVE_USER_INFO,
    payload: user,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: REMOVE_USER_INFO,
  });
  localStorage.setItem("token", "");
};

export const getAllUsers = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8000/users/admin/getAllUsers`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(data);
    dispatch({ type: ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8000/users/admin/getuser/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: token,
      },
    };

    const { data } = await axios.put(
      `http://localhost:8000/users/admin/updateUserRole/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",

        Authorization: token,
      },
    };

    const { data } = await axios.put(
      `http://localhost:8000/users/admin/updateUserRole/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(
      `http://localhost:8000/users/admin/deleteUser/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("slfnask" + data);
    console.log("delete  data");

    dispatch({ type: DELETE_USER_SUCCESS, payload: data.sucess });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
