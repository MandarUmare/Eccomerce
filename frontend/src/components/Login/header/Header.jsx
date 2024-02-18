import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Dropdown from "./Dropdown/Dropdown";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { searchProduct } from "../../../actions/productActions";
const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const [searchterm, setSearchterm] = useState("");
  const { product, error } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cartItems);
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
          <div className="relative">
            <FaRegHeart color="white" size={25}></FaRegHeart>
            <span className="absolute bg-green-600 rounded-full font-mono text-[10px] px-1 text-slate-100 top-[-2px] right-[-4px]">
              1
            </span>
          </div>
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
          <div className="relative">
            <CgProfile color="white" size={25}></CgProfile>
            <span className="absolute bg-green-600 rounded-full font-mono text-[10px] px-1 text-slate-100 top-[-2px] right-[-4px]">
              1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
