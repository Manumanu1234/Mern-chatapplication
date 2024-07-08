import React from 'react'
import Testuser from '../onlineusers/Testuser'
import "./availblegroup.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material'

function Availablegroup() {
  return (
    <div className='onlineusercontainer'>
    <div className='onlinehead'>
       
          <img className='onlineimg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbdgywUyi3GeY8033J2rl2M7RnKqyPCQW8dQ&s" alt="" /> 
    
       <h1 className='h1ofonline'>Availble Groups</h1>
    </div>

 {/* search bar */}
 <div className="side-bar-text1">
       <IconButton>
         <SearchOutlinedIcon />
       </IconButton>

       <input className='textarea2' type="text" placeholder='Search' />
     </div>

     <Testuser/>
     <Testuser/>
     <Testuser/>
     <Testuser/>
     <Testuser/>
     </div>
  )
}

export default Availablegroup