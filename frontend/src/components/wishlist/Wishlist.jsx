import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Header from "../Login/header/Header";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlistedProducts);
  const product = [];


 useEffect(()=>{

 },[wishlist]);
 
  const isWishlisted = {
    selected: true,
  };

  return (
    <>
      
      <h1 className=" p-8 px-10 text-5xl font-bold">Wishlist</h1>
      <div className="mb-20 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-y-8 gap-x-6  px-9 justify-between min-h-[50vh] ">
        {wishlist.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            isWishlisted={isWishlisted}
          ></ProductCard>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
