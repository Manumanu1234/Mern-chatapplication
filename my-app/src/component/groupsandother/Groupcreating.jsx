import React from 'react'
import "./group.css"
import { IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
function Groupcreating() {
    return (
        <div className='grupaddingp'>
         
                <input placeholder='Create Group' className='input-textp' type="text" />
                <div className='sendbuttonp'>
                    <IconButton>
                        <CheckIcon />
                    </IconButton>
                </div>
            
        </div>
    )
}

export default Groupcreating