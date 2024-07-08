import React, { useEffect } from 'react'
import "./Workarea.css"
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Welcome() {
axios.defaults.withCredentials=true;
 const navigate=useNavigate()
    const light=useSelector((state)=>state.key)
    let  values="https://userpilot.com/blog/wp-content/uploads/2022/10/Welcome-Greeting-Message-for-New-Customers-Best-Examples-and-Templates_3d947bcaaaf6d8fc021a5bba3ab13fd9_2000.png";
  return (
    
    <div className={`maincontainerw${light ? "" : " dark1"}`}>
        <div className='classnameforwelcome'>
        <ToastContainer />
        <img className='imgwelcome' src={values} alt="" />
        </div>
    
    </div>
  )
}

export default Welcome