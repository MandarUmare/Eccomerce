import axios from "axios";
import {
 
  SAVE_USER_INFO ,
  REMOVE_USER_INFO, 
} from "../constants/userConstants.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const saveUser= (user) => (dispatch) => {
   dispatch({
    type:SAVE_USER_INFO,
    payload:user,
   })
};

export const logout= () => (dispatch) => {
  dispatch({
    type:REMOVE_USER_INFO,
  
  })
  localStorage.setItem("token","");
}