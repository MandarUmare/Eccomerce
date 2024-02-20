import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SAVE_USER_INFO  
} from "../constants/userConstants.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const saveUser= (user) => (dispatch) => {
   dispatch({
    type:SAVE_USER_INFO,
    payload:user,
   })
};
