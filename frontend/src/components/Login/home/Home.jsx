import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Login from "../Login";
import Header from "../header/Header";
import Hero from "../../Hero/Hero";
import Categories from "../../Categories.jsx/Categories";
import BestDeals from "../../BestDeals/BestDeals";
import Metadata from "../../Metadata";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated) {
      Navigate("/");
    }else{
      toast("Logged in successfully");
    }
  }, []);

  return (
    <>
      <Metadata title={"Home page"}></Metadata>
      <div className="relative">
        <Hero></Hero>
        <Categories></Categories>
        <BestDeals></BestDeals>
      </div>
      <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
    </>
  );
};

export default Homepage;
