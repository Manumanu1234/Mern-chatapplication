import React from 'react'
import "./message2.css"
import { useSelector } from 'react-redux'
function Messageself({dataprops,dataprops2}) {
  
 
  return (
    <div className="message-orange">
    <p className="message-content">{dataprops}</p>
    <div className="message-timestamp-right">{dataprops2}</div>
</div>
    )
}

export default Messageself