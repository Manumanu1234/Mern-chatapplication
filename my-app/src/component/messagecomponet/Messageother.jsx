import React from 'react'
import "./message.css"
function Messageother({dataprops,dataprops2}) {
    return (
        <div>
            <div className="container">
                <div className="message-blue">
                    <p className="message-content">{dataprops}</p>
                    <div className="message-timestamp-left">{dataprops2}</div>
                </div>
            </div>
         </div>   



            )
}

            export default Messageother