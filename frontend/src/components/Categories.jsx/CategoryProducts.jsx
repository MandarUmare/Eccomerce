import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Slider from "@mui/material/Slider";
const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { product, loading } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlistedProducts);

  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const categoriesData = [
    {
      name: "Attire",
      image: "../../../public/pexels-juan-mendez-1536619.jpg",
    },
    {
      name: "Footwear",
      image: "../../../public/pexels-melvin-buezo-2529148 (1).jpg",
    },
    {
      name: "SmartPhones",
      image: "../../../public/-original-imagtc4g22rcatjg.webp",
    },
    {
      name: "SmartWatches",
      image:
        "../../../public/33-52-sw300-android-ios-syska-yes-original-imageubkesquqz8p.webp",
    },
    {
      name: "Tops",
      image: "../../../public/61BBlDNERFL._SL1100_.jpg",
    },
  ];
  useEffect(() => {
    dispatch(getProducts(name));
  }, [name]);

  return (
    <>
      <div className="flex mx-4 mt-4">
        <div className="filterBox mx-4 w-[15%]">
          <h1 className="text-lg font-bold mt-2 ">Price</h1>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
          />

          <h1 className="text-lg font-bold mt-2 ">Categories</h1>
          <ul className="categoryBox mt-2">
            <Link to={"/products"}>All</Link>
            {categoriesData.map((category) => (
              <Link to={`/category/${category.name}`}>
                <li
                  className="category-link my-1"
                  key={category.name}
                  onClick={() => setCategory(category.name)}
                >
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>

          <fieldset>
            <h1 className="text-lg font-bold  mt-2">Ratings Above</h1>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </fieldset>
        </div>
        {product.length !== 0 ? (
          <div className="mt-10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full  gap-y-8 gap-x-6  px-9 justify-between min-h-[50vh]">
            {product.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                isWishlisted={wishlist.find((item) => item._id === product._id)}
              ></ProductCard>
            ))}
          </div>
        ) : (
          <div className=" flex items-center h-72 justify-center">
            <h1 className="text-4xl font-bold text-zinc-400">
              No Product Found
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
