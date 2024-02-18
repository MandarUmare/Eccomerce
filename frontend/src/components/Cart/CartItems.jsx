import React from "react";
import { useDispatch } from "react-redux";
import { addtocart, removeFromCart } from "../../actions/cartActions";
import { toast } from "react-toastify";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();

  const decrease = (id, quantity, stock) => {
    const newQuantity = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addtocart(id, newQuantity));
  };

  const increase = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock <= quantity) {
      return;
    }

    dispatch(addtocart(id, newQuantity));
  };

  const remove = () => {
    dispatch(removeFromCart(item.product));
    toast.error("Item removed from the cart");
  };
  return (
    <div className="flex flex-wrap  justify-between px-8 m-4 py-2 items-center shadow-slate-400 shadow-md">
      <div className="w-32 h-28 flex object-cover">
        <img className="" src={item.image}></img>
      </div>
      <div className="flex relative right-52 flex-col ">
        <span>{item.name}</span>
        <span>₹{item.price}</span>
        <span
          className="text-red-500 font-semibold cursor-pointer"
          onClick={remove}
        >
          remove
        </span>
      </div>
      <div>
        <button
          onClick={() => decrease(item.product, item.quantity, item.stock)}
          className="bg-zinc-400 my-6 w-4 text-white"
        >
          -
        </button>
        <input className="w-7 text-center" value={item.quantity}></input>
        <button
          onClick={() => increase(item.product, item.quantity, item.stock)}
          className="bg-zinc-400 w-4 text-white"
        >
          +
        </button>
      </div>
      <div>₹{item.price * item.quantity}</div>
    </div>
  );
};

export default CartItems;
