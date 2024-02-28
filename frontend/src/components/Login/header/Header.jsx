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
import { RxHamburgerMenu } from "react-icons/rx";
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
  const [wish, setWishlist] = useState(false);
  const { product, error } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlistedProducts);
  const { cartItems } = useSelector((state) => state.cartItems);
  const { order } = useSelector((state) => state.newOrder);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const inputref = useRef(null);
  const navigate = useNavigate();
  const category = [];

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
          style={{ color: order?.length > 0 ? "tomato" : "unset" }}
        ></FaListAlt>
      ),
      name: "Orders",
      func: orders,
    },
    { icon: <IoPersonSharp></IoPersonSharp>, name: "Profile", func: account },
    {
      icon: (
        <FaShoppingCart
          style={{ color: cartItems?.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems?.length})`,
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
  console.log(wish);
  const handleScroll = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("header__shrink");
    } else {
      headerRef.current.classList.remove("header__shrink");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className=" container top-0 z-50 w-screen">
      <div className="flex flex-wrap bg-zinc-100  sm:justify-between justify-center items-center min-h-20">
        <div className="mx-16 flex  sm:justify-start justify-center items-center">
          <span>
            <img
              className="w-20 h-16"
              src="https://www.logolynx.com/images/logolynx/56/56afea50b83164e3e272d4ebeccd94fb.png"
            ></img>
          </span>
        </div>

        <div className="relative w-screen  flex items-center sm:w-[50%]">
          <input
            className="sm:w-[100%] lg:w-[90%] w-screen rounded-lg   border-blue-400 border-2 h-8 pl-2 pr-8"
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

        <div className="">
          <button className="pr-2 hidden sm:flex  rounded-lg relative  w-40 h-12 bg-black text-zinc-200 items-center justify-center ">
            Become Seller
            <FaAngleRight
              className="absolute align-middle right-2"
              size={18}
            ></FaAngleRight>
          </button>
        </div>
      </div>
      <div
        ref={headerRef}
        className="bg-indigo-600  flex sm:mx-auto flex-wrap justify-between w-screen items-center h-14"
      >
        <div
          onMouseEnter={() => setDropDown(true)}
          onMouseLeave={() => setDropDown(false)}
          className=" h-full sm:ml-16  mr-12 ml-2"
        >
          <button
            onClick={() => setDropDown(!dropDown)}
            className="flex w-16 pr-20 sm:w-full sm:flex  h-full mt-2 sm:justify-between items-center sm:px-2 bg-slate-100 rounded-lg  "
          >
            <BiMenuAltLeft className="pr-2" size={25}></BiMenuAltLeft>
            <span className="sm:right-2 right:0 sm:pr-6 sm:text-lg text-sm">
              All Categories
            </span>
            <FaAngleDown></FaAngleDown>
          </button>
          {dropDown ? (
            <Dropdown
              setDropDown={setDropDown}
              categoriesData={category}
            ></Dropdown>
          ) : null}
        </div>
        <div
          className="flex navigation  w-[35%]  "
          ref={menuRef}
          onClick={() => {
            toggleMenu();
          }}
        >
          <div className="menu min-[862px]:text-slate-100 text-zinc-700  justify-between w-[100%] items-center flex">
            <Link to={"/home"}>
              <div className="sm:text-lg text-xl min-[862px]:mt-0 mt-6 min-[862px]:font-normal font-bold sm:active:text-orange-500">
                Home
              </div>
            </Link>
            {!wish ? (
              <Link to={"/wishlist"}>
                <div className="sm:text-lg text-xl min-[862px]:mt-0 mt-6 min-[862px]:font-normal font-bold min-[862px]:active:text-orange-500">
                  WishList
                </div>
              </Link>
            ) : (
              <Link>
                <div className="sm:text-lg text-xl min-[862px]:mt-0 mt-6 min-[862px]:font-normal font-bold min-[862px]:active:text-orange-500">
                  Best Selling
                </div>
              </Link>
            )}

            <Link to={"/products"}>
              <div className="sm:text-lg text-xl min-[862px]:mt-0 mt-6 min-[862px]:font-normal font-bold min-[862px]:active:text-orange-500">
                Products
              </div>
            </Link>
            <Link>
              <div className="sm:text-lg text-xl min-[862px]:mt-0 mt-6 min-[862px]:font-normal font-bold min-[862px]:active:text-orange-500">
                Events
              </div>
            </Link>
            <Link>
              <div className="sm:text-lg text-xl min-[862px]:mt-0 mt-6 min-[862px]:font-normal font-bold min-[862px]:active:text-orange-500">
                FAQ
              </div>
            </Link>
          </div>
        </div>
        <div className="flex  justify-between w-32 mr-16 items-center">
          <Link to={"/wishlist"}>
            <div className="relative ">
              <FaRegHeart color="white" size={25}></FaRegHeart>
              {wishlist?.length > 0 ? (
                <span className="absolute bg-green-600 rounded-full font-mono text-[10px] px-1 text-slate-100 top-[-2px] right-[-4px]">
                  {wishlist?.length}
                </span>
              ) : null}
            </div>
          </Link>
          <Link to={"/cart"}>
            <div className="relative cursor-pointer ml-6">
              <PiShoppingCartBold color="white" size={25}></PiShoppingCartBold>
              {cartItems?.length > 0 ? (
                <span className="absolute bg-green-600 rounded-full font-mono text-[10px] px-1 text-slate-100 top-[-2px] right-[-4px]">
                  {cartItems?.length}
                </span>
              ) : null}
            </div>
          </Link>
          <div className="relative flex  items-center ml-6  object-cover">
            <Box
              zIndex={10}
              className="relative bottom-4"
              width={2}
              sx={{
                "& .MuiFab-primary": {
                  width: 35,
                  height: 0,
                  backgroundColor: "rgb(79 70 229 / 1)",
                },
              }}
            >
              <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                style={{ zIndex: "11" }}
                direction="down"
                className="speedDial w-2 h-2"
                icon={
                  user?.avtar?.url ? (
                    <img
                      className="speedDialIcon rounded-full w-8 h-8 "
                      src={user.avtar.url ? user.avtar.url : "/Profile.png"}
                      alt="Profile"
                    />
                  ) : (
                    <CgProfile size={25}></CgProfile>
                  )
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
          </div>
          <span className="mobile__menu" onClick={toggleMenu}>
            <RxHamburgerMenu
              color="white"
              size={25}
              className="min-[862px]:hidden ml-4 left-4 relative  "
            ></RxHamburgerMenu>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
