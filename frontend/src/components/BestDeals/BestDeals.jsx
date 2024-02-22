import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loding from "../LOading/Loding";

const BestDeals = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlistedProducts);
  const { loading, error, product } = useSelector((state) => state.products);
  console.log(wishlist);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loding></Loding>
      ) : (
        <>
          <h1 className=" p-8 px-10 text-5xl font-bold">Best Deals</h1>
          <div className="mb-20 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-y-8 gap-x-6  px-9 justify-between min-h-[50vh] ">
            {product.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                isWishlisted={wishlist.find(
                  (item) => item._id === product._id
                )}
              ></ProductCard>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default BestDeals;
