import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { Sidebar, Menu, MenuItem ,SubMenu} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Login from '../Login';
import Header from '../header/Header';
import Hero from '../../Hero/Hero';
import Categories from '../../Categories.jsx/Categories';
import BestDeals from '../../BestDeals/BestDeals'
import Metadata from '../../Metadata';
import { ToastContainer, toast } from 'react-toastify';

const Homepage = () => {
  const Navigate=useNavigate();
  
  useEffect(()=>{
    const token=localStorage.getItem("token");
    axios.get("http://localhost:8000/users/protected",{headers:{
        Authorization:token,
    }}).then((response)=>{
        console.log(response.data);
    }).catch((err)=>{
      Navigate("/");
    })
  })

  const logout=async ()=>{
  localStorage.removeItem("token");
  Navigate("/");
  }

 
  return (
    
    <>
    <Metadata title={"Home page"}></Metadata>
       <div className='relative'>
        <Header></Header>
        <Hero></Hero>
        <Categories></Categories>
        <BestDeals></BestDeals>
        <ToastContainer></ToastContainer>
       </div>
     
    </>
  )
}

export default Homepage
