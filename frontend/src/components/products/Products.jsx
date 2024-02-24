import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Header from "../Login/header/Header";

import { Pagination } from "@mui/material";

const Products = () => {
  const {product} = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlistedProducts);
  console.log(product);
  return (
    <>
     
      <div className="mt-10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-y-8 gap-x-6  px-9 justify-between min-h-[50vh]">
        {product.map((product, index) => (
          <ProductCard key={product._id} product={product}
           isWishlisted={wishlist.find(
                  (item) => item._id === product._id
                )}
                ></ProductCard>
        ))}
      </div>
      <div className="flex m-8 justify-center items-center">
        <Pagination
          count={10}
          variant="outlined"
          color="primary"
          shape="rounded"
          size="large"
        />
      </div>
    </>
  );
};

export default Products;
