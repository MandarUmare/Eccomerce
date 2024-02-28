import { React, useEffect, useState } from "react";
import { PiShoppingCartBold } from "react-icons/pi";
import { TfiCup } from "react-icons/tfi";
import { RxReload } from "react-icons/rx";
import { SiFsecure } from "react-icons/si";
import axios from "axios";
import { useSelector } from "react-redux";
import Loding from "../LOading/Loding";
import { Link } from "react-router-dom";

const Categories = () => {
  const { product, loading } = useSelector((state) => state.products);
  const categoriesData = [
    {
      name: "Attire",
      image: " https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
     
    },
    {
      name: "Footwear",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      
    },
    {
      name: "SmartPhones",
      image:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/z/4/r/-original-imagtc4g22rcatjg.jpeg?q=70&crop=false",
    },
    {
      name: "SmartWatches",
      image:
        "https://rukminim2.flixcart.com/image/832/832/l3t2fm80/smartwatch/b/7/n/33-52-sw300-android-ios-syska-yes-original-imageubkesquqz8p.jpeg?q=70&crop=false",
    },
    {
      name: "Tops",
      image: "https://m.media-amazon.com/images/I/61BBlDNERFL._SL1100_.jpg",
    },
  ];
  return (
    <>
      <div className="bg-white min-h-20 flex justify-between flex-wrap   items-center rounded-lg my-8 mx-8">
        <div className="bg-white h-20 flex justify-center  items-center rounded-lg my-2 mx-8">
          <span className="px-4">
            <PiShoppingCartBold size={38} color="#FFD700"></PiShoppingCartBold>
          </span>
          <div>
            <h4 className="font-bold ">Free Shipping</h4>
            <p className="text-sm text-slate-500 ">From all orders over $100</p>
          </div>
        </div>

        <div className="bg-white h-20 flex justify-center  items-center rounded-lg my-2 mx-8">
          <span className="px-4">
            <RxReload size={38} color="#FFD700"></RxReload>
          </span>
          <div>
            <h4 className="font-bold ">Daily Surprise Offers</h4>
            <p className="text-sm text-slate-500 ">Save up to 25% off</p>
          </div>
        </div>
        <div className="bg-white h-20 flex justify-center  items-center rounded-lg my-2 mx-8">
          <span className="px-4">
            <TfiCup size={38} color="#FFD700"></TfiCup>
          </span>
          <div>
            <h4 className="font-bold ">Affordable Price</h4>
            <p className="text-sm text-slate-500 ">Get factory direct price</p>
          </div>
        </div>
        <div className="bg-white h-20 flex justify-center  items-center rounded-lg my-2 mx-8">
          <span className="px-4">
            <SiFsecure size={38} color="#FFD700"></SiFsecure>
          </span>
          <div>
            <h4 className="font-bold ">Secure Payments</h4>
            <p className="text-sm text-slate-500 ">100% protected payments</p>
          </div>
        </div>
      </div>
      {loading ? (
        <Loding></Loding>
      ) : (
        <>
          <h1 className="text-5xl p-8 font-bold">Categories</h1>
          <div className="bg-white   grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  min-h-20  justify-between flex-wrap   items-center rounded-lg my-8 mx-8">
            {categoriesData.map((category, index) => (
              <Link to={`/category/${category.name}`}>
                <div className="flex px-4 py-4 min-h-42    flex-wrap justify-between">
                  <h1
                    key={category}
                    className="px-2 py-2 w-24 font-semibold text-xl"
                  >
                    {category.name}
                  </h1>
                  {/* <span className="h-32 w-36 pb-4 flex object-cover ">
                    <img
                      className="rounded-lg w-32 mb-4 pb-4 h-36"
                      src={category.image}
                    ></img>
                  </span> */}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Categories;
