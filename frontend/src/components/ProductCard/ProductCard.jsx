import React, { useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { FiEye } from "react-icons/fi";
import { FaStarHalf } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProductDetails(product._id));
  },[dispatch])
 

  const options = {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "#FFD700",
      size: window.innerWidth < 600 ? 20 : 25,
      value: product.ratings,
      isHalf: true,
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className=" px-2 z-0 h-80 py-4 flex shadow-lg shadow-slate-200 hover:shadow-slate-400 hover:scale-105 ease-in-out duration-300  flex-col container text-xs relative bg-white rounded-lg box-shadow-black xs-[340px]:w-50 w-full">
        <div className="flex overflow-hidden justify-center h-36">
          <img className="object-contain pr-7" src={product.image.url}></img>
          <div className="flex flex-col absolute right-2 top-3 ">
            <span className="py-2 px-0 pl-2">
              <FaRegHeart color="grey" size={20}></FaRegHeart>
            </span>
            <span className="py-2 px-0 pl-2">
              <FiEye color="grey" size={20}></FiEye>
            </span>
            <span className="py-2 px-0 pl-2">
              <PiShoppingCartBold color="grey" size={20}></PiShoppingCartBold>
            </span>
          </div>
        </div>
        <div className="text-sky-400 text-xs absolute bottom-20">
          Company name
        </div>
        <div className="font-bold text-lg absolute bottom-24">
          {product.name}
        </div>
        <div className="text-xs absolute bottom-14 py-2">
          {product.description}
        </div>
        <div className="absolute flex bottom-8 py-2">
          <ReactStars {...options}></ReactStars>
        </div>
        <div className="flex relative top-32  ">
          <div className="font-semibold text-sm">{`₹${product.price}`}</div>
          <div className="absolute  text-green-500 text-xs right-0">{`${product.stock} sold`}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
