import React from 'react'
import { PiShoppingCartBold } from "react-icons/pi";
import { TfiCup } from "react-icons/tfi";
import { RxReload } from "react-icons/rx";
import { SiFsecure } from "react-icons/si";

const Hero = () => {
  return (
    <>
    
    <div className='flex  justify-end items-center min-h-[80vh] bg-cover w-[100%] relative z-[-1]  ' style={{backgroundImage: "url('https://img.freepik.com/premium-photo/room-with-white-wall-plant-with-pot-with-plant-it_445983-17104.jpg')"}}>
    <div className='m-20 sm:w-full top-[10%] left-[7%]'>
        <h1 className='text-[3rem] font-bold w-[50%] '>
            Best Collection For Home Decoration
        </h1>
        <p className='w-[60%] py-4'>
             To add a background image in a React application, you can use CSS styles within your React components. Here's a basic example of how you can achieve this
        </p>
        <div className='pr-2  rounded-lg relative cursor-pointer flex w-40 h-12 bg-black text-zinc-200 items-center justify-center '>
            Shop Now
        </div>
    </div>
    </div>
   
    </>
  )
}

export default Hero
