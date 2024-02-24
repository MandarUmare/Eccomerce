import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineExitToApp } from "react-icons/md";
import Dropdown from "./Dropdown/Dropdown";
import { FaListAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { searchProduct } from "../../../actions/productActions";
import { toast } from "react-toastify";
// import * as React from 'react';
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { logout } from "../../../actions/userActions";

const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const [searchterm, setSearchterm] = useState("");
  const { product, error } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlistedProducts);
  const { cartItems } = useSelector((state) => state.cartItems);
  const { order } = useSelector((state) => state.newOrder);
  const { user } = useSelector((state) => state.user);
  const category = [];
  const inputref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = () => {
    navigate(`/search/${searchterm}`);
    dispatch(searchProduct(searchterm));
  };

  if (!error) {
    product.forEach((item) => {
      {
        if (!category.includes(item.category)) {
          category.push(item.category);
        }
      }
    });
    category.forEach((item) => {
      console.log(item);
    });
  }

  const options = [
    {
      icon: (
        <FaListAlt
          style={{ color: order.length > 0 ? "tomato" : "unset" }}
        ></FaListAlt>
      ),
      name: "Orders",
      func: orders,
    },
    { icon: <IoPersonSharp></IoPersonSharp>, name: "Profile", func: account },
    {
      icon: (
        <FaShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    {
      icon: <MdOutlineExitToApp></MdOutlineExitToApp>,
      name: "Logout",
      func: logoutUser,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard className="mr-2"></MdDashboard>,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    
    navigate("/");
    toast("Logout Successfully");
  }

  return (
    <div className=" container sticky top-0 z-50  mx-auto">
      <div className="flex flex-wrap bg-zinc-100 justify-between items-center min-h-20">
        <div className="mx-16">
          <span>
            <img className="w-20 h-16" src="/images.png"></img>
          </span>
        </div>

        <div className="relative  flex items-center w-[50%]">
          <input
            className="w-[90%] rounded-lg  border-blue-400 border-2 h-8 pl-2 pr-8"
            placeholder="Search products..."
            onChange={() => setSearchterm(inputref.current.value)}
            ref={inputref}
          ></input>
          <IoMdSearch
            onClick={search}
            className="absolute right-[11%] "
            size={20}
          ></IoMdSearch>
        </div>

        <div className="mr-16 ">
          <button className="pr-2 rounded-lg relative flex w-40 h-12 bg-black text-zinc-200 items-center justify-center ">
            Become Seller
            <FaAngleRight
              className="absolute align-middle right-2"
              size={18}
            ></FaAngleRight>
          </button>
        </div>
      </div>
      <div className="bg-indigo-600 flex flex-wrap justify-between items-center h-14">
        <div
          onMouseEnter={() => setDropDown(true)}
          onMouseLeave={() => setDropDown(false)}
          className=" h-full mx-16"
        >
          <button
            onClick={() => setDropDown(!dropDown)}
            className="flex  h-full mt-2 justify-between items-center px-2 bg-slate-100 rounded-lg  "
          >
            <BiMenuAltLeft className="pr-2" size={25}></BiMenuAltLeft>
            <span className="right-2 pr-6">All Categories</span>
            <FaAngleDown></FaAngleDown>
          </button>
          {dropDown ? (
            <Dropdown
              setDropDown={setDropDown}
              categoriesData={category}
            ></Dropdown>
          ) : null}
        </div>
        <div className="flex text-slate-100 justify-between w-[35%] items-center">
          <Link to={"/home"}>
            <div>Home</div>
          </Link>
          <Link>
            <div>Best Selling</div>
          </Link>
          <Link to={"/products"}>
            <div>Products</div>
          </Link>
          <Link>
            <div>Events</div>
          </Link>
          <Link>
            <div>FAQ</div>
          </Link>
        </div>
        <div className="flex justify-between w-32 mr-16 items-center">
          <Link to={"/wishlist"}>
            <div className="relative">
              <FaRegHeart color="white" size={25}></FaRegHeart>
              {wishlist.length > 0 ? (
                <span className="absolute bg-green-600 rounded-full font-mono text-[10px] px-1 text-slate-100 top-[-2px] right-[-4px]">
                  {wishlist.length}
                </span>
              ) : null}
            </div>
          </Link>
          <Link to={"/cart"}>
            <div className="relative cursor-pointer">
              <PiShoppingCartBold color="white" size={25}></PiShoppingCartBold>
              {cartItems.length > 0 ? (
                <span className="absolute bg-green-600 rounded-full font-mono text-[10px] px-1 text-slate-100 top-[-2px] right-[-4px]">
                  {cartItems.length}
                </span>
              ) : null}
            </div>
          </Link>
          <div className="relative flex items-center bottom-3   object-cover">
            {user ? (
              <Box
                width={2}
                sx={{ "& .MuiFab-primary": { width: 35, height: 0 } }}
              >
                <SpeedDial
                  ariaLabel="SpeedDial tooltip example"
                  style={{ zIndex: "11" }}
                  direction="down"
                  className="speedDial w-2 h-2"
                  icon={
                    <img
                      className="speedDialIcon rounded-full w-8 h-8 "
                      src={user.avtar.url ? user.avtar.url : "/Profile.png"}
                      alt="Profile"
                    />
                  }
                >
                  {options.map((item) => (
                    <SpeedDialAction
                      key={item.name}
                      icon={item.icon}
                      tooltipTitle={item.name}
                      onClick={item.func}
                      tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                  ))}
                </SpeedDial>
              </Box>
            ) : (
              <CgProfile></CgProfile>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
