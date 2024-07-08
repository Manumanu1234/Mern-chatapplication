import React, { useContext, useEffect } from 'react'
import Sidbar from '../component/sidebarcomponent/Sidbar'
import './Maincontainer.css'
import Workarea from '../component/workareacomponet/Workarea'
import Welcome from '../component/workareacomponet/Welcome'
import Groupcreating from '../component/groupsandother/Groupcreating'
import Login from '../component/login/Login'
import Onlineuser from '../component/onlineusers/Onlineuser'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MyContext } from '../component/contextapi/CreateContext'

function Maincontainer() {
  let navigate=useNavigate()
  const { id, setId } = useContext(MyContext);
 

  
  useEffect(() => {
    axios.get('http://localhost:3001/validitychecking', { withCredentials: true })
    .then((response) => {
      console.log("Response data:", response.data.isLoggedIn);
      let isLoggedIn = response.data.isLoggedIn;
      setId(isLoggedIn);
      
      console.log("Updated id:", id); 
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        toast('Welcome'); 
      }
    })
    .catch((error) => {
      console.error('Error checking validity:', error);
    });
    
  }, [])
  
  return (
    <div className='maincontainer'>
      {id ?  <Sidbar/> :""}
 
   <Outlet/>
    </div>
  )
}

export default Maincontainer