import React, { useContext, useEffect, useState } from 'react'
import "./Online.css"
import { IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Testuser from './Testuser';
import { useSelector } from 'react-redux';
import { MyContext } from '../contextapi/CreateContext';
import axios from 'axios';
function Onlineuser() {
  const light = useSelector((state) => state.key)
  const { id, setId } = useContext(MyContext);
  const [online, setonline] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:3001/totalonlineusers/${id}`).then((response) => {
      setonline(response.data);
    }).catch(error => {
    
      console.error('Error fetching data:', error);
    });
  }, [id]); 
  

  return (
    <div className='onlineusercontainer'>
      <div className={`onlinehead${light ? "" : " dark1"}`}>

        <img className='onlineimg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbdgywUyi3GeY8033J2rl2M7RnKqyPCQW8dQ&s" alt="" />

        <h1 className='h1ofonline'>Online user</h1>
      </div>

      {/* search bar */}
      <div className={`side-bar-text1${light ? "" : " dark1"}`}>
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>

        <input className={`textarea2${light ? "" : " dark1"}`} type="text" placeholder='Search' />
      </div>

      {/* textuser componet */}
      {online.length !=0 ?
        online.map((elem,index) => {
          return (
            <div key={index}>
                <Testuser nameprop={elem.Name} id={elem._id}/>
            </div>
          )
        })
        : ""}
    </div>
  )
}

export default Onlineuser