import React from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

const Reviews = () => {
  const { product } = useSelector((state) => state.productDetails);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#FFD700",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <div className="flex flex-col mb-6 sm:mt-0 mt-28 justify-center   items-center font-bold text-gray-400">
      <h1 className="text-5xl mb-6 ">Reviews</h1>
      <div className="min-h-72 p-4 w-full sm:flex-row flex-col flex flex-wrap justify-center">
        {product.reviews.map((item, index) => (
          <div className="flex mt-8 border-solid  shadow-md shadow-slate-300 border-gray-800 py-6 px-2 rounded-md bg-white flex-col mx-8 sm:w-60 w-[80%]  justify-center items-center">
            <img className="rounded-full w-20 h-20" src="/new2.jpg"></img>
            <div className="pt-2 mt-2">{item.username}</div>
            <ReactStars value={item.rating} {...options}></ReactStars>
            <div className="p-4 m-4 text-gray-600  text-sm">
              {item.comments}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
