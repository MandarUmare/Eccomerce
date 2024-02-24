import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { product } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlistedProducts);
  useEffect(() => {
    dispatch(getProducts(name));
  }, [name]);

  return (
    <>
      <div>
        <Link to={'/category/'}><span></span></Link>
        <Link to={'/category/'}><span></span></Link>
        <Link to={'/category/'}><span></span></Link>
        <Link to={'/category/'}><span></span></Link>
      </div>
      <div className="mt-10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-y-8 gap-x-6  px-9 justify-between min-h-[50vh]">
        {product.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            isWishlisted={wishlist.find((item) => item._id === product._id)}
          ></ProductCard>
        ))}
      </div>
    </>
  );
};

export default CategoryProducts;
