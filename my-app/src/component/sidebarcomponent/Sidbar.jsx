import React, { useContext, useEffect, useState } from 'react'
import './Sidbar.css'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Icon, IconButton } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeToogler } from '../Reduxuse/Themeslicer';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { MyContext, MyContextMessage } from '../contextapi/CreateContext';
import { io, Socket } from "socket.io-client";

function Sidbar() {
  var soket;
  var ENDPOINT='http://localhost:3001'
 
  const light=useSelector((state)=>state.key)
  console.log("manu"+light)
  const dispatch=useDispatch()
  let navigate=useNavigate();
  const [conversation, setconversation] = useState()
  const {id,setId}=useContext(MyContext)
  const { message,setNewMessage}=useContext(MyContextMessage)
  useEffect(() => {
    console.log("hey naby",id)
    axios.get(`http://localhost:3001/finduserchat/${id}`, { withCredentials: true }).then((response)=>{
      console.log(response.data);
      setconversation(response.data)
    })
    
  }, [])
 
 
  
  async function handlefunction3(senderid,name,time){
   axios.get(`http://localhost:3001/findchatids/${id}/${senderid}`).then((response)=>{
    console.log('manuuxxxx');
    console.log(response);
    setNewMessage(response.data)
    soket=io(ENDPOINT)
   let idw='123'
    soket.emit("join chat", idw)
     navigate('Workarea', { state: {senderId:senderid,Name:name,time:time} })
   })
 }

 const [lastMessages, setLastMessages] = useState({});
 const [lasttime,setlasttime]=useState({})
 const [soketconnection, setsoketconnection] = useState(null)

 useEffect(() => {
  if (conversation && conversation.length > 0) {
  
    const fetchLastMessages = async () => {
      const messages = {};
      const time={}

      
      await Promise.all(conversation.map(async (conv) => {
        try {
          const response = await axios.get(`http://localhost:3001/findchatids1/${id}/${conv._id}`);
          messages[conv._id] = response.data.text;
          time[conv._id]=response.data.createdAt
        } catch (error) {
          console.error(`Error fetching data for conversation ${conv._id}:`, error);
          messages[conv._id] = 'Error fetching message'; 
        }
      }));
      setlasttime(time)
      setLastMessages(messages); 
    };

    fetchLastMessages(); 
  }
}, [id, conversation]); 





 

  return (
    <div className="main-sidebar">
      <div className={`sidebar-header${light ? "" : " dark1"}`} >
        <div>
          <IconButton className={light ? "" : " dark1"}>
            <PermIdentityOutlinedIcon />
          </IconButton>
        </div>

        <div className='forspace'>
          <IconButton onClick={()=>{navigate("Onlineuser")}} className={light ? "" : " dark1"}>
            <GroupOutlinedIcon  />
          </IconButton>
          <IconButton onClick={()=>{navigate("availablegroup")}}className={light ? "" : " dark1"}>
            <GroupAddOutlinedIcon />
          </IconButton>
  
        <IconButton className={light ? "" : " dark1"}>
            <AddCircleOutlineOutlinedIcon onClick={()=>{navigate("Groupcreating")}} />
          </IconButton>

          <IconButton className={light ? "" : " dark1"} onClick={()=>{
              dispatch(ThemeToogler())
            }}>
              {!light && <NightsStayOutlinedIcon/>}
               {light && <LightModeIcon/>}
               
          </IconButton>
          <IconButton onClick={()=>{
           axios.get(`http://localhost:3001/logot/${id}`, { withCredentials: true })
           .then((response) => {
             navigate('/login')
             window.location.reload();
           })
           .catch((error) => {
             console.error('Error checking validity:', error);
           });
          }} className={light ? "" : " dark1"}>
            <LogoutIcon  />
          </IconButton>
          
        </div>


      </div>


      <div className={`side-bar-text${light ? "" : " dark1"}`} >
        <IconButton className={light ? "" : " dark1"}>
          <SearchOutlinedIcon />
        </IconButton>

        <input className={`textarea1${light ? "" : " dark1"}`}   type="text" placeholder='Search' />
      </div>
      <div className={`side-bar-container${light ? "" : " dark1"}`} >
        { conversation ? conversation.map((conversation) => {
            return (
              <div onClick={()=>{handlefunction3(conversation._id,conversation.Name,conversation.edited)}}  className='conversation-container' key={conversation._id}>
                <p className='con-icon' >{conversation.Name[0]}</p>
                <p className='con-title'>{conversation.Name}</p>
                <p className='con-lastmessage'>lastmessage: {lastMessages[conversation._id]}</p>
                
                <p className='con-timestamp'>{lasttime[conversation._id]}</p>
              </div>

            )
          }) :""
        }

      </div>
    </div>

  )
}

export default Sidbar