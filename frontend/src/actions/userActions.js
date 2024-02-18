import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../constants/userConstants.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = (username, password) => (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    
    axios
    .post("http://localhost:8000/users/login", {username,password})
    .then((response) => {
      dispatch({type:LOGIN_SUCCESS,payload:response.data})
      localStorage.setItem("token", response.data.token);
      Navigate("/home");
    })
    .catch((err) => {
        dispatch({type:LOGIN_FAIL,payload:err.response.data.message});
        toast()
      console.log(err);
    });
      
  } catch (error) {
    dispatch({ type: ALL_PRODUCT_FAIL, payload: error.response.data.message });
  }
};
