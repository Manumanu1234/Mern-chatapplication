import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { io } from 'socket.io-client';
import Messageself from '../messagecomponet/Messageself';
import Messageother from '../messagecomponet/Messageother';
import { MyContext, MyContextMessage } from '../contextapi/CreateContext';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import peer from '../../service/peer';
function Workarea() {
  const ENDPOINT = 'http://localhost:3001';
  const { id } = useContext(MyContext);
  const { state } = useLocation();
  const { message, setNewMessage } = useContext(MyContextMessage);
  const [text, setText] = useState('');
  const [socket, setSocket] = useState(null);
  const [mystream, setmysteam] = useState(null);
 const [RemoteSoketId, setRemoteSoketId] = useState('')

 const handleincommingcall = useCallback(async ({ from, offer }) => {
  setRemoteSoketId(from);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const myOffer = await peer.getoffer();
    socket.emit("user:call", { to: '123', offer: myOffer });
    setmysteam(stream);
  } catch (err) {
    if (err.name === 'NotAllowedError' || err.name === 'NotFoundError' || err.name === 'NotReadableError') {
      console.error('Access to camera denied or not available:', err.message);
      alert("Access to camera denied or not available. Please check browser permissions and ensure no other applications are using the camera.");
    } else if (err.name === 'AbortError') {
      console.error('getUserMedia aborted:', err.message);
    } else if (err.name === 'SecurityError') {
      console.error('Security error accessing camera:', err.message);
    } else if (err.name === 'DOMException' && err.message.includes('Device in use')) {
      console.error('Camera device is already in use:', err.message);
      alert("Camera device is already in use. Please close other applications using the camera or try again later.");
    } else {
      console.error('Error accessing camera:', err.message);
      alert("An error occurred while accessing the camera. Please try again later.");
    }
    return;
  }
  const ans = await peer.getanswer(offer);
  socket.emit('callacepted', { to: from, ans });
});
  const handlecallacepted=useCallback(async({from,ans})=>{
    peer.setLocalDescription(ans)
    console.log("call acepted")
  })
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    newSocket.on('message received', (newMessage) => {
      console.log("Received new message:", newMessage);
      setNewMessage(prevMessages => [...prevMessages, newMessage]);
    });

    newSocket.emit('setup', id);
    newSocket.emit('join chat', '123');
    newSocket.on('incomming:call',handleincommingcall)
    newSocket.on("callacepted",handlecallacepted)

    return () => {
      newSocket.disconnect();
    };
  }, [id, state.senderId, setNewMessage]);

  const sendMessage = () => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let time = hours + ':' + minutes;

    const messageObj = {
      Chatid: id,
      Senderid: state.senderId,
      text: text,
      createdAt: time,
      updatedAt: time 
    };

    axios.post(`http://localhost:3001/newmessage`, messageObj)
      .then((response) => {
        if (socket) {
          socket.emit('new message', messageObj);
        }
        setText('');
        setNewMessage([...message, messageObj]); 
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  async function startvdo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
     const offer=await peer.getoffer();
     socket.emit("user:call",{to:'123',offer})
      setmysteam(stream);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  }

  return (
    <div className='main-workarea'>
      {mystream && <video autoPlay ref={(videoElement) => { if (videoElement) videoElement.srcObject = mystream; }} height='300px' width='300px' />}
      <div className="chat-head">
        <IconButton>
          <PersonIcon />
        </IconButton>
        <div className="user-info">
          <p className='title'>{state.Name}</p>
          <p className='timespan'>{state.time}</p>
        </div>
        <div className='delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <VideoCallIcon onClick={startvdo} />
          </IconButton>
        </div>
      </div>

      <div className="chat-container">
        {message && message.map((elem, index) => (
          <div key={index}>
            {id === elem.Chatid ?
              <Messageself dataprops={elem.text} dataprops2={elem.updatedAt} /> :
              <Messageother dataprops={elem.text} dataprops2={elem.updatedAt} />
            }
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input onChange={(e) => { setText(e.target.value) }} placeholder='Type Text Here' value={text} name='text' className='input-text' type="text" />
        <div className='sendbutton'>
          <IconButton onClick={sendMessage}>
            <SendOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Workarea;
